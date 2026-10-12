import { notFound } from "next/navigation";
import { getArtist } from "@/data/artists";
import { songsByArtist } from "@/data/songs";
import SongRow from "@/components/SongRow";

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = getArtist(id);
  if (!artist) return notFound();
  const artistSongs = songsByArtist(artist.id);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-deepbrown grayscale flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-serifBn text-2xl text-night-text">{artist.name}</h1>
          <p className="font-sansBn text-sm text-night-text/60 mt-2 max-w-xl">{artist.bio}</p>
          <p className="font-sansBn text-xs text-night-text/50 mt-2">মোট গান {artistSongs.length}টি</p>
        </div>
      </div>

      <h2 className="font-serifBn text-lg text-night-text mb-3">সব গান</h2>
      <div className="rounded-2xl border border-night-accent/15 bg-night-card/40 overflow-hidden">
        {artistSongs.map((s, i) => (
          <SongRow key={s.id} song={s} index={i + 1} queue={artistSongs} />
        ))}
        {artistSongs.length === 0 && (
          <p className="p-6 text-center font-sansBn text-night-text/60">এই শিল্পীর গান এখনও যুক্ত করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}