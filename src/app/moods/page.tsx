import MoodCard from "@/components/MoodCard";
import { moods } from "@/data/moods";

export default function MoodsPage() {
  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">আজ মনটা কেমন?</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">আপনার মনের পরিস্থিতি অনুযায়ী বেছে নিন আপনার প্রিয় গান...</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {moods.map((m) => (
          <MoodCard key={m.id} mood={m} />
        ))}
      </div>
    </div>
  );
}