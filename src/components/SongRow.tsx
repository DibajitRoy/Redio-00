"use client";

import { Song } from "@/types/music";
import { usePlayer } from "@/context/PlayerContext";

export default function SongRow({
  song,
  index,
  queue,
}: {
  song: Song;
  index: number;
  queue?: Song[];
}) {
  const { playSong, toggleFavorite, isFavorite, current, isPlaying } = usePlayer();
  const active = current?.id === song.id;

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-xl border-b border-night-accent/10 hover:bg-night-card/60 cursor-pointer ${
        active ? "bg-night-card" : ""
      }`}
      onClick={() => playSong(song, queue)}
    >
      <span className="w-6 text-center font-sansBn text-night-text/50 text-sm">
        {String(index).padStart(2, "0")}
      </span>
      <span className="w-6">{active && isPlaying ? "❚❚" : "▶"}</span>
      <div className="flex-1 min-w-0">
        <p className="font-sansBn text-night-text truncate">{song.title}</p>
        <p className="font-sansBn text-xs text-night-text/60 truncate">{song.artistName}</p>
      </div>
      <span className="font-sansBn text-xs text-night-text/60 hidden sm:inline">{song.duration}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(song.id);
        }}
        aria-label="পছন্দ"
      >
        <span className={isFavorite(song.id) ? "text-red-400" : "text-night-text/40"}>❤</span>
      </button>
    </div>
  );
}