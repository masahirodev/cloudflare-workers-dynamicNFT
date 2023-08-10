import { Env } from "..";

// type ResponseType = {
//   location: {
//     name: string;
//     region: string;
//     country: string;
//     lat: number;
//     lon: number;
//     tz_id: string;
//     localtime_epoch: number;
//     localtime: string;
//   };
//   current: {
//     last_updated_epoch: number;
//     last_updated: string;
//     temp_c: number;
//     temp_f: number;
//     is_day: number;
//     condition: {
//       text: string;
//       icon: string;
//       code: number;
//     };
//     wind_mph: number;
//     wind_kph: number;
//     wind_degree: number;
//     wind_dir: string;
//     pressure_mb: number;
//     pressure_in: number;
//     precip_mm: number;
//     precip_in: number;
//     humidity: number;
//     cloud: number;
//     feelslike_c: number;
//     feelslike_f: number;
//     vis_km: number;
//     vis_miles: number;
//     uv: number;
//     gust_mph: number;
//     gust_kph: number;
//   };
// };

export const updateMetadata = async (env: Env) => {
  const kv = env.dynamic;
  const result = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${env.WEATHER_API_KEY}&q=tokyo`
  )
    .then((res) => res.text())
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((error) => {
      console.error(error);
    });

  await kv.put("temperature", result["current"]["temp_c"]);
  await kv.put("weather", result["current"]["condition"]["text"]);
};
