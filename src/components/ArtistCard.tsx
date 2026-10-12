import Link from "next/link";
import { Artist } from "@/types/music";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artists/${artist.id}`}
      className="flex flex-col items-center gap-2 rounded-2xl border border-night-accent/15 bg-night-card p-4 text-center hover:border-night-accent/50 transition"
    >
      <div className="relative w-20 h-20 rounded-full overflow-hidden bg-deepbrown grayscale">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />
      </div>
      <p className="font-sansBn text-sm text-night-text">{artist.name}</p>
      <p className="font-sansBn text-xs text-night-text/60">মোট গান {artist.songCount}টি</p>
    </Link>
  );
}