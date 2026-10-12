import { Mood } from "@/types/music";

export const moods: Mood[] = [
  { id: "brishti", title: "বৃষ্টির দিন", subtitle: "জানালার পাশে বসে পুরোনো কিছু গান...", image: "/images/moods/brishti.jpg" },
  { id: "cha", title: "চায়ের আড্ডা", subtitle: "এক কাপ চা আর কিছু প্রিয় সুর।", image: "/images/moods/cha.jpg" },
  { id: "rod", title: "নরম রোদ", subtitle: "বিকেলের মিষ্টি আলোয় হারিয়ে যাওয়ার মতো গান।", image: "/images/moods/rod.jpg" },
  { id: "eka", title: "একাকিত্ব", subtitle: "যখন চারপাশটা একটু বেশি নীরব লাগে।", image: "/images/moods/eka.jpg" },
  { id: "smriti", title: "স্মৃতিচারণ", subtitle: "পুরোনো দিনের পুরোনো কিছু গল্প।", image: "/images/moods/smriti.jpg" },
  { id: "ghum", title: "ঘুমের আগে", subtitle: "রাত গভীর হলে ধীরে বাজুক কিছু সুর।", image: "/images/moods/ghum.jpg" },
  { id: "anondo", title: "আনন্দের দিন", subtitle: "বন্ধুদের আড্ডা আর হাসির সুর।", image: "/images/moods/anondo.jpg" },
  { id: "bhor", title: "সেই ভোরবেলা", subtitle: "পুরোনো দিনের সকালের গান।", image: "/images/moods/bhor.jpg" },
  { id: "chithi", title: "ভালোবাসার চিঠি", subtitle: "না বলা কথাগুলোর সুর।", image: "/images/moods/chithi.jpg" },
  { id: "pothchola", title: "পথচলা", subtitle: "চলতে চলতে শোনার মতো গান।", image: "/images/moods/pothchola.jpg" },
  { id: "cinema", title: "সিনেমার স্মৃতি", subtitle: "রূপালি পর্দার সেই সব দিন।", image: "/images/moods/cinema.jpg" },
  { id: "boshonto", title: "বসন্তের দিন", subtitle: "কোকিলের ডাক আর পুরোনো প্রেমের গান।", image: "/images/moods/boshonto.jpg" },
];

export function getMood(id: string) {
  return moods.find((m) => m.id === id);
}