export const getMetadata = async (
  tokenId: string,
  kv: KVNamespace,
  imagePath: string
) => {
  const temperature = await kv.get("temperature", { cacheTtl: 3600 });
  const weather = await kv.get("weather", { cacheTtl: 3600 });
  let prefix: string;

  switch (weather) {
    case "Sunny":
      prefix = "Sunny";
      break;
    case "Cloudy":
    case "Partly cloudy":
      prefix = "Cloudy";
      break;
    default:
      prefix = "Rain";
      break;
  }

  const data = {
    image: imagePath + prefix + tokenId + ".png",
    external_url: "",
    description: "This is a trial dynamic NFT using cloudflare workers",
    name: `dynamicNFT#${tokenId}`,
    attributes: [
      {
        trait_type: "temperature",
        value: temperature,
      },
      {
        trait_type: "weather",
        value: weather,
      },
    ],
    background_color: "",
    animation_url: "",
    youtube_url: "",
  };

  // const json = JSON.stringify(data, null, 2);
  const json = data;
  return json;
};
