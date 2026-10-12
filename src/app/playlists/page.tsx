import Link from "next/link";
import MoodCard from "@/components/MoodCard";
import { moods } from "@/data/moods";

export default function PlaylistsPage() {
  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">জনপ্রিয় প্লেলিস্ট</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">মুড অনুযায়ী সাজানো কিছু প্লেলিস্ট</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {moods.map((m) => (
          <MoodCard key={m.id} mood={m} />
        ))}
      </div>

      <Link
        href="/favorites"
        className="inline-block rounded-full border border-night-accent/40 px-5 py-2 font-sansBn text-sm hover:bg-night-card transition"
      >
        ❤ আমার পছন্দের গান দেখুন
      </Link>
    </div>
  );
}