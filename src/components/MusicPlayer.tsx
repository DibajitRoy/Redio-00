"use client";

import { usePlayer } from "@/context/PlayerContext";
import { songThumbnail } from "@/types/music";

function formatTime(sec: number) {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function MusicPlayer() {
  const { current, isPlaying, togglePlay, next, prev, progress, elapsed, duration, seekTo, toggleFavorite, isFavorite } =
    usePlayer();

  if (!current) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-deepbrown/95 backdrop-blur border-t border-gold/20">
      <div className="max-w-7xl mx-auto flex items-center gap-3 px-3 md:px-6 py-2.5">
        <img
          src={songThumbnail(current.youtubeId)}
          alt={current.title}
          className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
        />
        <div className="min-w-0 w-28 md:w-48 flex-shrink-0">
          <p className="font-sansBn text-sm text-cream truncate">{current.title}</p>
          <p className="font-sansBn text-xs text-cream/60 truncate">{current.artistName}</p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-center gap-4 text-lg text-cream">
            <button onClick={prev} aria-label="আগের গান">◀</button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-gold text-deepbrown flex items-center justify-center"
              aria-label="প্লে / পজ"
            >
              {isPlaying ? "❚❚" : "▶"}
            </button>
            <button onClick={next} aria-label="পরের গান">▶</button>
          </div>
          <div className="hidden sm:flex items-center gap-2 w-full max-w-md">
            <span className="text-[10px] text-cream/60 w-10 text-right">{formatTime(elapsed)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress || 0}
              onChange={(e) => seekTo(parseFloat(e.target.value))}
              className="flex-1 accent-gold"
            />
            <span className="text-[10px] text-cream/60 w-10">{formatTime(duration)}</span>
          </div>
        </div>

        <button onClick={() => toggleFavorite(current.id)} className="flex-shrink-0" aria-label="পছন্দ">
          <span className={isFavorite(current.id) ? "text-red-400" : "text-cream/40"}>❤</span>
        </button>
      </div>
    </div>
  );
}