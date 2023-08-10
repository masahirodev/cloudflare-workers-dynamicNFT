import {
  error, // creates error responses
  json, // creates JSON responses
  Router, // the ~440 byte router itself
  withParams, // middleware: puts params directly on the Request
  createCors,
} from "itty-router";
import { Env } from ".";
import { getMetadata } from "./api/getMetadata";

export const handleRequest = (request: Request, env: Env) => {
  // create the CORS pair
  const { preflight, corsify } = createCors({
    origins: [env.ALLOW_ORIGIN],
    methods: ["GET"],
    maxAge: 86400,
    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "text/plain",
    },
  });
  const router = Router({ base: "/api" });

  router
    // add some middleware upstream on all routes
    .all("*", preflight, withParams)

    .get("/:tokenId", async ({ tokenId }) => {
      return await getMetadata(tokenId, env.dynamic, env.IMAGE_PATH);
    })

    .all("*", () => error(404));

  return (
    router
      .handle(request, env)
      .then(json) // send as JSON
      .catch(error) // catch errors

      // add CORS headers to all requests,
      // including errors
      .then(corsify)
  );
};
