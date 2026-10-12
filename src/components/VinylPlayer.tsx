"use client";

import { usePlayer } from "@/context/PlayerContext";

export default function VinylPlayer() {
  const { current, isPlaying, togglePlay, next, prev, progress } = usePlayer();

  return (
    <div className="relative rounded-3xl overflow-hidden border border-gold/30 max-w-md mx-auto">
      {/* background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/radio-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* readability-এর জন্য উপরে dark overlay */}
      <div className="absolute inset-0 bg-deepbrown/70" />

      <div className="relative z-10 p-6 md:p-8 text-center">
        <p className="font-serifBn text-xl text-gold mb-1">রেডিও ০০</p>
        <div className="rounded-xl bg-deepbrown/70 py-4 mb-4 border border-gold/30">
          <p className="font-sansBn text-sm text-cream/80">৯৮.৬ FM</p>
          <p className="text-lg text-cream">{isPlaying ? "♪ ♫ ♪ ♫" : "· · · ·"}</p>
        </div>

        <div className="w-full h-1.5 rounded-full bg-cream/20 mb-4 overflow-hidden">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-6 text-xl mb-4 text-cream">
          <button onClick={prev} aria-label="আগের গান">◀</button>
          <button
            onClick={togglePlay}
            className="w-11 h-11 rounded-full bg-gold text-deepbrown flex items-center justify-center"
            aria-label="প্লে / পজ"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button onClick={next} aria-label="পরের গান">▶▶</button>
        </div>

        <p className="font-sansBn text-xs text-cream/70">এখন বাজছে</p>
        <p className="font-sansBn text-cream truncate">{current?.title ?? "কোনো গান নির্বাচিত নয়"}</p>
        <p className="font-sansBn text-xs text-cream/70">{current?.artistName ?? ""}</p>
      </div>
    </div>
  );
}