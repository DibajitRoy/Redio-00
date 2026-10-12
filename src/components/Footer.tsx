import Link from "next/link";

const links = [
  { href: "/songs", label: "গান" },
  { href: "/artists", label: "শিল্পী" },
  { href: "/moods", label: "মুড" },
  { href: "/timebox", label: "সময়ের বাক্স" },
  { href: "/about", label: "আমাদের কথা" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-oldpaper/70 border-t-2 border-gold/50 pb-28">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-full.png" alt="রেডিও ০০" className="h-24 w-auto" />
          <p className="font-serifBn text-lg text-deepbrown">সুরে থাকুক স্মৃতি...</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-sansBn text-sm text-coffee">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-deepbrown transition">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="text-center font-sansBn text-xs text-coffee/60 pb-6">
        পুরোনো দিনের গান, পুরোনো দিনের অনুভূতি
      </p>
    </footer>
  );
}