"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SongRow from "@/components/SongRow";
import SectionTitle from "@/components/SectionTitle";
import { songs } from "@/data/songs";

export default function SongsPage() {
  return (
    <Suspense fallback={null}>
      <SongsPageInner />
    </Suspense>
  );
}

function SongsPageInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  // Navbar থেকে সার্চ করলে এখানেও query আপডেট হবে
  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artistName.toLowerCase().includes(q) ||
        (s.albumName ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <SectionTitle
        title="গানের খাতা"
        subtitle="মনে থাকা সোনালি দিনের গান, এক জায়গায়"
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="গান, শিল্পী অথবা অ্যালবাম খুঁজুন..."
        className="w-full rounded-full bg-night-card border border-gold/30 focus:border-gold px-5 py-2.5 mb-6 outline-none font-sansBn text-sm placeholder:text-night-text/40 transition"
      />

      <div className="rounded-2xl border border-night-accent/15 bg-night-card/40 overflow-hidden">
        {filtered.map((s, i) => (
          <SongRow key={s.id} song={s} index={i + 1} queue={filtered} />
        ))}
        {filtered.length === 0 && (
          <p className="p-6 text-center font-sansBn text-night-text/60">কোনো গান পাওয়া যায়নি।</p>
        )}
      </div>
    </div>
  );
}