import Link from "next/link";
import { Mood } from "@/types/music";

export default function MoodCard({ mood }: { mood: Mood }) {
  return (
    <Link
      href={`/moods/${mood.id}`}
      className="relative flex flex-col justify-end rounded-2xl border border-night-accent/15 overflow-hidden min-h-[190px] hover:-translate-y-0.5 transition"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mood.image}
        alt={mood.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deepbrown via-deepbrown/50 to-transparent" />
      <div className="relative z-10 p-4">
        <p className="font-serifBn text-lg text-cream">{mood.title}</p>
        <p className="font-sansBn text-xs text-cream/75 leading-relaxed mt-1">{mood.subtitle}</p>
      </div>
    </Link>
  );
}