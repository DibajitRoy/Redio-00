"use client";

import Image from "next/image";
import { Song, songThumbnail } from "@/types/music";
import { usePlayer } from "@/context/PlayerContext";

export default function SongCard({ song, queue }: { song: Song; queue?: Song[] }) {
  const { playSong, toggleFavorite, isFavorite, current, isPlaying } = usePlayer();
  const active = current?.id === song.id;

  return (
    <div className="group rounded-2xl overflow-hidden border border-night-accent/15 bg-night-card">
      <div className="relative aspect-square">
        <Image
          src={songThumbnail(song.youtubeId)}
          alt={song.title}
          fill
          className="object-cover"
          unoptimized
        />
        <button
          onClick={() => playSong(song, queue)}
          className="absolute inset-0 flex items-center justify-center bg-deepbrown/0 group-hover:bg-deepbrown/40 transition"
        >
          <span className="opacity-0 group-hover:opacity-100 text-2xl bg-night-accent text-deepbrown rounded-full w-10 h-10 flex items-center justify-center transition">
            {active && isPlaying ? "❚❚" : "▶"}
          </span>
        </button>
      </div>
      <div className="p-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="font-sansBn text-sm text-night-text truncate">{song.title}</p>
          <p className="font-sansBn text-xs text-night-text/60 truncate">{song.artistName}</p>
        </div>
        <button onClick={() => toggleFavorite(song.id)} aria-label="পছন্দ">
          <span className={isFavorite(song.id) ? "text-red-400" : "text-night-text/40"}>❤</span>
        </button>
      </div>
    </div>
  );
}