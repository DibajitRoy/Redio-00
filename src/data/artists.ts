import { Artist } from "@/types/music";

export const artists: Artist[] = [
  {
    id: "hemanta",
    name: "হেমন্ত মুখোপাধ্যায়",
    photo: "/images/artists/hemanta.jpg",
    bio: "১৯২০ সালে জন্ম নেওয়া বাংলা সংগীতের কিংবদন্তি কণ্ঠশিল্পী। তাঁর কণ্ঠে বহু কালজয়ী গান আজও শ্রোতাদের মন ছুঁয়ে যায়।",
    songCount: 124,
  },
  { id: "manna", name: "মান্না দে", photo: "/images/artists/manna.jpg", bio: "বাংলা ও হিন্দি সংগীতের অন্যতম শ্রেষ্ঠ কণ্ঠশিল্পী।", songCount: 108 },
  { id: "sandhya", name: "সন্ধ্যা মুখোপাধ্যায়", photo: "/images/artists/sandhya.jpg", bio: "বাংলা আধুনিক গানের এক অবিস্মরণীয় নাম।", songCount: 96 },
  { id: "lata", name: "লতা মঙ্গেশকর", photo: "/images/artists/lata.jpg", bio: "উপমহাদেশের সুরের সরস্বতী।", songCount: 210 },
  { id: "asha", name: "আশা ভোঁসলে", photo: "/images/artists/asha.jpg", bio: "বহু ভাষায় গান গাওয়া বিস্মৃত এক কণ্ঠ।", songCount: 150 },
  { id: "shyamal", name: "শ্যামল মিত্র", photo: "/images/artists/shyamal.jpg", bio: "মধুর কণ্ঠের আধুনিক বাংলা গানের শিল্পী।", songCount: 78 },
  { id: "satinath", name: "সতীনাথ মুখোপাধ্যায়", photo: "/images/artists/satinath.jpg", bio: "বাংলা আধুনিক গানের অন্যতম পথিকৃৎ।", songCount: 54 },
  { id: "manabendra", name: "মানবেন্দ্র মুখোপাধ্যায়", photo: "/images/artists/manabendra.jpg", bio: "গভীর অনুভূতির কণ্ঠশিল্পী।", songCount: 61 },
  { id: "arati", name: "আরতি মুখোপাধ্যায়", photo: "/images/artists/arati.jpg", bio: "বহু কালজয়ী গানের কণ্ঠদাত্রী।", songCount: 88 },
];

export function getArtist(id: string) {
  return artists.find((a) => a.id === id);
}