// src/data/aiVideos.js

const thumbnailFiles = import.meta.glob(
  "../assets/thumnail/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function findThumbnail(keyword) {
  const match = Object.entries(thumbnailFiles).find(([path]) =>
    path.toLowerCase().includes(keyword.toLowerCase())
  );

  return match?.[1] || "";
}

export const aiVideos = [
  {
    id: 1,
    title: "AI Political Campaign Video",
    category: "Campaign Video",
    description:
      "A cinematic AI-powered political campaign video.",
    youtubeId: "mlD4Xu-5StI",
    thumbnail: findThumbnail("Ghana Campaign"),
  },
  {
    id: 2,
    title: "Barkass Groundnut Paste",
    category: "Product Commercial",
    description:
      "An AI-generated commercial for Barkass Groundnut Paste.",
    youtubeId: "lqOJkq1Cw1s",
    thumbnail: findThumbnail("Barkass"),
  },
  {
    id: 3,
    title: "Danmilla Gari Mix",
    category: "Product Commercial",
    description:
      "An AI-generated commercial for Danmilla Foods Gari Mix.",
    youtubeId: "VLo3y266dMk",
    thumbnail: findThumbnail("Danmilla"),
  },
];