"use client";

import { useState } from "react";
import SongRow from "@/components/SongRow";
import { songs } from "@/data/songs";

const decades = [1950, 1960, 1970, 1980, 1990];

export default function TimeBoxPage() {
  const [active, setActive] = useState(1970);

  const filtered = songs.filter((s) => s.year && s.year >= active && s.year < active + 10);

  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">সময়ের বাক্স</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">দশক বেছে নিন, ফিরে যান সেই সময়ে</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {decades.map((d) => (
          <button
            key={d}
            onClick={() => setActive(d)}
            className={`px-4 py-1.5 rounded-full font-sansBn text-sm border transition ${
              active === d
                ? "bg-night-accent text-deepbrown border-night-accent"
                : "border-night-accent/30 text-night-text/80 hover:border-night-accent/60"
            }`}
          >
            {d}-এর দশক
          </button>
        ))}
      </div>

      <h2 className="font-serifBn text-lg text-night-text mb-3">{active}-এর দশক</h2>
      <div className="rounded-2xl border border-night-accent/15 bg-night-card/40 overflow-hidden">
        {filtered.map((s, i) => (
          <SongRow key={s.id} song={s} index={i + 1} queue={filtered} />
        ))}
        {filtered.length === 0 && (
          <p className="p-6 text-center font-sansBn text-night-text/60">এই দশকের কোনো গান এখনও যুক্ত করা হয়নি।</p>
        )}
      </div>
    </div>
  );
}