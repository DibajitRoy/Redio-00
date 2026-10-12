import { notFound } from "next/navigation";
import { getMood } from "@/data/moods";
import { songsByMood } from "@/data/songs";
import SongRow from "@/components/SongRow";

export default async function MoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mood = getMood(id);
  if (!mood) return notFound();
  const moodSongs = songsByMood(mood.id);

  return (
    <div>
      <div className="relative rounded-3xl overflow-hidden mb-8 min-h-[220px] flex items-end">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mood.image} alt={mood.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-deepbrown via-deepbrown/50 to-transparent" />
        <div className="relative z-10 p-6">
          <h1 className="font-serifBn text-3xl text-cream">{mood.title}-এর গান</h1>
          <p className="font-sansBn text-sm text-cream/80 mt-1">{mood.subtitle}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-night-accent/15 bg-night-card/40 overflow-hidden">
        {moodSongs.map((s, i) => (
          <SongRow key={s.id} song={s} index={i + 1} queue={moodSongs} />
        ))}
        {moodSongs.length === 0 && (
          <p className="p-6 text-center font-sansBn text-night-text/60">এই মুডের জন্য এখনও গান যুক্ত করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}