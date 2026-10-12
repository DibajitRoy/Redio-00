import Hero from "@/components/Hero";
import MoodCard from "@/components/MoodCard";
import SongCard from "@/components/SongCard";
import ArtistCard from "@/components/ArtistCard";
import VinylPlayer from "@/components/VinylPlayer";
import SectionTitle from "@/components/SectionTitle";
import { moods } from "@/data/moods";
import { songs } from "@/data/songs";
import { artists } from "@/data/artists";

const ribbon = [
  "সুরের স্মৃতি",
  "পুরোনো দিনের গান",
  "হারিয়ে যাওয়া সুর",
  "সেই দিনের গান",
  "স্মৃতির সুরে, সময়ের সাথে",
];

function Ribbon() {
  const items = [...ribbon, ...ribbon];
  return (
    <div className="full-bleed bg-gold text-deepbrown border-y border-deepbrown/20 py-2.5 overflow-hidden">
      <div className="marquee-track font-serifBn text-base">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((t, i) => (
              <span key={i} className="flex items-center">
                <span className="px-6">{t}</span>
                <span className="w-1.5 h-1.5 rotate-45 bg-deepbrown/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Ribbon />

      <section className="pt-16">
        <SectionTitle
          title="আজ কোন স্মৃতির গান শুনবেন?"
          subtitle="মনের অবস্থা বেছে নিন, সুর খুঁজে নেবে আপনাকে"
          href="/moods"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {moods.slice(0, 6).map((m) => (
            <MoodCard key={m.id} mood={m} />
          ))}
        </div>
      </section>

      <section className="full-bleed bg-deepbrown mt-16">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <SectionTitle title="আজকের নির্বাচিত গান" subtitle="আজকের আসরের সেরা কিছু সুর" href="/songs" tone="light" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {songs.slice(0, 4).map((s) => (
              <SongCard key={s.id} song={s} queue={songs} />
            ))}
          </div>
        </div>
      </section>

      <section className="pt-16">
        <SectionTitle
          title="সুরের কারিগর"
          subtitle="যাদের কণ্ঠে বেঁচে আছে আমাদের সময়"
          href="/artists"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {artists.slice(0, 5).map((a) => (
            <ArtistCard key={a.id} artist={a} />
          ))}
        </div>
      </section>

      <section className="pt-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <SectionTitle title="পুরোনো রেডিও" />
          <p className="font-sansBn text-night-text/75 leading-relaxed">
            চালিয়ে দিন, আর সুর ভেসে আসুক পুরোনো দিনের মতো। এক কাপ চা, জানালার ধারে
            বিকেলের আলো, আর রেডিওতে সেই চেনা গান।
          </p>
        </div>
        <VinylPlayer />
      </section>
    </div>
  );
}