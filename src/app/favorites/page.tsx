"use client";

import { usePlayer } from "@/context/PlayerContext";
import { songs } from "@/data/songs";
import SongRow from "@/components/SongRow";

export default function FavoritesPage() {
  const { favorites } = usePlayer();
  const favSongs = songs.filter((s) => favorites.includes(s.id));

  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">যে গানগুলো মনে ধরেছে</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">আপনার পছন্দ করা সব গান, এক জায়গায়</p>

      <div className="rounded-2xl border border-night-accent/15 bg-night-card/40 overflow-hidden">
        {favSongs.map((s, i) => (
          <SongRow key={s.id} song={s} index={i + 1} queue={favSongs} />
        ))}
        {favSongs.length === 0 && (
          <p className="p-6 text-center font-sansBn text-night-text/60">
            এখনও কোনো গান ❤ দিয়ে পছন্দ করেননি।
          </p>
        )}
      </div>
    </div>
  );
}