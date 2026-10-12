import Link from "next/link";
import { Album } from "@/types/music";

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <Link
      href={`/albums/${album.id}`}
      className="rounded-2xl overflow-hidden border border-night-accent/15 bg-night-card hover:border-night-accent/50 transition"
    >
      <div className="relative aspect-[3/4]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={album.cover} alt={album.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <p className="font-sansBn text-sm text-night-text truncate">{album.name}</p>
        <p className="font-sansBn text-xs text-night-text/60">{album.year}</p>
      </div>
    </Link>
  );
}