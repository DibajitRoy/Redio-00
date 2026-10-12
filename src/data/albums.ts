import { Album } from "@/types/music";

export const albums: Album[] = [
  {
    id: "saptapadi",
    name: "সপ্তপদী",
    cover: "/images/albums/saptapadi.svg",
    year: 1961,
    type: "সিনেমার গান",
    artistName: "হেমন্ত মুখোপাধ্যায়",
    songIds: ["song-1"],
  },
  {
    id: "harano-sur",
    name: "হারানো সুর",
    cover: "/images/albums/harano-sur.svg",
    year: 1957,
    type: "সিনেমার গান",
    artistName: "হেমন্ত মুখোপাধ্যায়",
    songIds: [],
  },
  {
    id: "ontony",
    name: "অন্তনী",
    cover: "/images/albums/antony.svg",
    year: 1967,
    type: "সিনেমার গান",
    artistName: "মান্না দে",
    songIds: [],
  },
  {
    id: "grihodaho",
    name: "গৃহদাহ",
    cover: "/images/albums/grihodaho.svg",
    year: 1967,
    type: "সিনেমার গান",
    artistName: "সন্ধ্যা মুখোপাধ্যায়",
    songIds: [],
  },
];

export function getAlbum(id: string) {
  return albums.find((a) => a.id === id);
}