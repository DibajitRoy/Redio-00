import { notFound } from "next/navigation";
import { getAlbum } from "@/data/albums";
import { songsByAlbum } from "@/data/songs";
import SongRow from "@/components/SongRow";

export default function AlbumDetailPage({ params }: { params: { id: string } }) {
  const album = getAlbum(params.id);
  if (!album) return notFound();
  const albumSongs = songsByAlbum(album.id);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div className="relative w-full sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={album.cover} alt={album.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-serifBn text-2xl text-night-text">{album.name}</h1>
          <p className="font-sansBn text-sm text-night-text/60 mt-1">{album.type}</p>
          <p className="font-sansBn text-sm text-night-text/60">{album.year}</p>
          <p className="font-sansBn text-sm text-night-text/60 mt-2">{album.artistName}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-night-accent/15 bg-night-card/40 overflow-hidden">
        {albumSongs.map((s, i) => (
          <SongRow key={s.id} song={s} index={i + 1} queue={albumSongs} />
        ))}
        {albumSongs.length === 0 && (
          <p className="p-6 text-center font-sansBn text-night-text/60">এই অ্যালবামে এখনও গান যুক্ত করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}