"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import { songs } from "@/data/songs";

// ধুলোকণা: [left%, top%, সময়(s), delay(s)]
const motes: [number, number, number, number][] = Array.from({ length: 22 }, (_, i) => [
  20 + ((i * 17) % 45),
  45 + ((i * 29) % 45),
  9 + (i % 5) * 2,
  (i * 0.7) % 8,
]);

// রেডিওর অবস্থান (ছবির প্রস্থ/উচ্চতার %): নিজের ছবি দেখে বদলান
const RADIO = { left: 30, top: 62 };

const notes = ["♪", "♫", "♩", "♬", "♪", "♫"];

function Bird({ left, top, delay }: { left: number; top: number; delay: number }) {
  return (
    <svg
      className="hero-bird"
      style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
      viewBox="0 0 40 20"
      aria-hidden
    >
      <path className="wl" d="M20 12 C15 4, 8 3, 1 7 C8 7, 14 9, 20 12Z" />
      <path className="wr" d="M20 12 C25 4, 32 3, 39 7 C32 7, 26 9, 20 12Z" />
      <ellipse cx="20" cy="12.6" rx="2.6" ry="1.5" />
    </svg>
  );
}

export default function Hero() {
  const { playSong } = usePlayer();

  return (
    <section className="hero full-bleed -mt-8" aria-label="ব্যানার">
      <div className="hero-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/banner.jpg" alt="পুরোনো দিনের গান, আজও নতুন লাগে..." />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-hair" src="/images/banner.jpg" alt="" aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-curtain" src="/images/banner.jpg" alt="" aria-hidden />
        <div className="hero-glow" />

        <Bird left={89} top={44} delay={0} />
        <Bird left={90} top={34} delay={5} />
        <Bird left={88} top={40} delay={10} />

        {/* রেডিও থেকে সুরের চিহ্ন */}
        {notes.map((n, i) => (
          <span
            key={i}
            className="hero-note"
            style={
              {
                left: `${RADIO.left}%`,
                top: `${RADIO.top}%`,
                "--dl": `${i}s`,
                "--dx": `${(i % 2 ? 1 : -1) * (1.5 + (i % 3))}vw`,
                "--rot": `${(i % 2 ? 1 : -1) * 22}deg`,
              } as React.CSSProperties
            }
          >
            {n}
          </span>
        ))}

        {/* ভাসমান ধুলোকণা */}
        {motes.map(([x, y, d, dl], i) => (
          <span
            key={i}
            className="hero-mote"
            style={{ left: `${x}%`, top: `${y}%`, "--d": `${d}s`, "--dl": `${dl}s` } as React.CSSProperties}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-deepbrown/80 to-transparent pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="max-w-7xl mx-auto px-4 pb-5 md:pb-8 flex flex-wrap items-center gap-3">
          <button
            onClick={() => playSong(songs[0], songs)}
            className="inline-flex items-center gap-2 rounded-full bg-gold text-deepbrown px-6 py-2.5 font-sansBn font-medium shadow-lg hover:brightness-110 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4l14 8-14 8z" />
            </svg>
            আজকের গান শুনুন
          </button>
          <Link
            href="/moods"
            className="inline-flex items-center rounded-full border border-cream/60 text-cream px-6 py-2.5 font-sansBn hover:bg-cream/10 transition"
          >
            মুড অনুযায়ী খুঁজুন
          </Link>
        </div>
      </div>
    </section>
  );
}