export interface WallpaperItem {
  id: string;
  name: string;
  author: string;
  thumbnail: string;
  src: string;
  isDynamic?: boolean;
  lightSrc?: string;
  darkSrc?: string;
}

export const UBUNTU_WALLPAPERS: WallpaperItem[] = [
  {
    id: "noble-dynamic",
    name: "Noble Numbat (Default Dynamic)",
    author: "Canonical Design Team",
    thumbnail: "/wallpapers/thumbs/noble-dynamic.webp",
    src: "/wallpapers/noble-light.webp",
    isDynamic: true,
    lightSrc: "/wallpapers/noble-light.webp",
    darkSrc: "/wallpapers/noble-dark.webp",
  },
  {
    id: "clouds",
    name: "Clouds",
    author: "Tibor Mokanszki",
    thumbnail: "/wallpapers/thumbs/clouds.webp",
    src: "/wallpapers/clouds.webp",
  },
  {
    id: "mount-fuji",
    name: "Mount Fuji",
    author: "Amaral",
    thumbnail: "/wallpapers/thumbs/mount-fuji.webp",
    src: "/wallpapers/mount-fuji.webp",
  },
  {
    id: "monument-valley",
    name: "Monument Valley",
    author: "Orbitelambda",
    thumbnail: "/wallpapers/thumbs/monument-valley.webp",
    src: "/wallpapers/monument-valley.webp",
  },
  {
    id: "northern-lights",
    name: "Northern Lights",
    author: "Mizuno",
    thumbnail: "/wallpapers/thumbs/northern-lights.webp",
    src: "/wallpapers/northern-lights.webp",
  },
  {
    id: "south-france",
    name: "Province of South France",
    author: "Orbitelambda",
    thumbnail: "/wallpapers/thumbs/south-france.webp",
    src: "/wallpapers/south-france.webp",
  },
  {
    id: "rainbow-bulb",
    name: "Rainbow Lightbulb",
    author: "Daniel Micallef",
    thumbnail: "/wallpapers/thumbs/rainbow-bulb.webp",
    src: "/wallpapers/rainbow-bulb.webp",
  },
  {
    id: "little-numbat",
    name: "Little Numbat Boy",
    author: "Azskalt",
    thumbnail: "/wallpapers/thumbs/little-numbat.webp",
    src: "/wallpapers/little-numbat.webp",
  },
  {
    id: "fuwafuwa-dark",
    name: "Fuwafuwa Nanbatto-san",
    author: "Amaral",
    thumbnail: "/wallpapers/thumbs/fuwafuwa-dark.webp",
    src: "/wallpapers/fuwafuwa-dark.webp",
  },
  {
    id: "noble-light",
    name: "Noble Numbat Light",
    author: "Canonical Design Team",
    thumbnail: "/wallpapers/thumbs/noble-light.webp",
    src: "/wallpapers/noble-light.webp",
  },
  {
    id: "noble-dark",
    name: "Noble Numbat Dimmed",
    author: "Canonical Design Team",
    thumbnail: "/wallpapers/thumbs/noble-dark.webp",
    src: "/wallpapers/noble-dark.webp",
  },
  {
    id: "ubuntu-dark",
    name: "Ubuntu Dark Minimal",
    author: "Canonical Design Team",
    thumbnail: "/wallpapers/thumbs/ubuntu-dark.webp",
    src: "/wallpapers/ubuntu-dark.webp",
  },
  {
    id: "warty-heritage",
    name: "Ubuntu 20th Anniversary Heritage",
    author: "Canonical Design Team",
    thumbnail: "/wallpapers/thumbs/warty-heritage.webp",
    src: "/wallpapers/warty-heritage.webp",
  },
];

