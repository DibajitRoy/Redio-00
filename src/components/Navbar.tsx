"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "হোম" },
  { href: "/songs", label: "গান" },
  { href: "/artists", label: "শিল্পী" },
  { href: "/albums", label: "অ্যালবাম" },
  { href: "/moods", label: "মুড" },
  { href: "/movies", label: "সিনেমা" },
  { href: "/timebox", label: "সময়ের বাক্স" },
  { href: "/playlists", label: "প্লেলিস্ট" },
  { href: "/about", label: "আমাদের কথা" },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M12 20s-7-4.6-9.2-9A5.2 5.2 0 0112 6.6 5.2 5.2 0 0121.2 11C19 15.4 12 20 12 20z" />
    </svg>
  );
}

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/songs?q=${encodeURIComponent(query)}`);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-gold/50 shadow-sm shadow-deepbrown/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-2">
        {/* লোগো + নাম */}
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-icon.png" alt="" className="h-12 w-auto" />
          <span className="leading-tight">
            <span className="block font-serifBn text-2xl font-semibold text-deepbrown">রেডিও ০০</span>
            <span className="block font-sansBn text-[11px] tracking-wide text-coffee/70">পুরোনো দিনের গান</span>
          </span>
        </Link>

        {/* ডেস্কটপ মেনু */}
        <nav className="hidden xl:flex items-center gap-0.5 font-sansBn text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full transition-colors ${
                isActive(l.href)
                  ? "bg-deepbrown text-cream"
                  : "text-coffee hover:text-deepbrown hover:bg-deepbrown/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ডান পাশ */}
        <div className="flex items-center gap-2">
          <form
            onSubmit={onSearch}
            className="hidden sm:flex items-center gap-2 bg-white/50 pl-3 pr-4 py-1.5 rounded-full border border-gold/50 focus-within:border-gold transition text-coffee"
          >
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="গান, শিল্পী খুঁজুন..."
              className="bg-transparent outline-none text-sm text-deepbrown placeholder:text-coffee/50 w-32 lg:w-44"
            />
          </form>

          <Link
            href="/favorites"
            aria-label="আমার পছন্দ"
            className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center text-coffee hover:text-deepbrown hover:border-gold transition"
          >
            <HeartIcon />
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="মেনু"
            className="xl:hidden w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center text-coffee"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* মোবাইল মেনু */}
      {open && (
        <div className="xl:hidden border-t border-gold/30 px-4 py-4 space-y-4">
          <form
            onSubmit={onSearch}
            className="sm:hidden flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full border border-gold/50 text-coffee"
          >
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="গান, শিল্পী খুঁজুন..."
              className="bg-transparent outline-none text-sm text-deepbrown placeholder:text-coffee/50 flex-1"
            />
          </form>
          <div className="grid grid-cols-2 gap-2 font-sansBn text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-center ${
                  isActive(l.href) ? "bg-deepbrown text-cream" : "bg-deepbrown/5 text-coffee"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}