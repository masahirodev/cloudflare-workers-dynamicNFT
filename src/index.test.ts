import { unstable_dev } from "wrangler";
import type { UnstableDevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
  let worker: UnstableDevWorker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.ts", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should return Hello World", async () => {
    const resp = await worker.fetch("/api/1");
    if (resp) {
      const text = await resp.text();

      expect(JSON.parse(text)).toMatchInlineSnapshot(`
        {
          "animation_url": "",
          "attributes": [
            {
              "trait_type": "temperature",
              "value": "33",
            },
            {
              "trait_type": "weather",
              "value": "Light rain",
            },
          ],
          "background_color": "",
          "description": "This is a trial dynamic NFT using cloudflare workers",
          "external_url": "",
          "image": "https://arweave.net/D9Ac64K5hIaSqRvni5nSZjDAyqoetrAcDLGiOzLkNcc/Rain1.png",
          "name": "dynamicNFT#1",
          "youtube_url": "",
        }
      `);
    }
  });
});
