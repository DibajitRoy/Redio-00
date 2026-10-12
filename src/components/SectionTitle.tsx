import Link from "next/link";

export default function SectionTitle({
  title,
  subtitle,
  href,
  linkLabel = "সব দেখুন",
  tone = "dark",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="flex items-end justify-between gap-4 mb-6">
      <div>
        <h2 className={`font-serifBn text-2xl md:text-3xl ${light ? "text-cream" : "text-night-text"}`}>{title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <span className="h-px w-12 bg-gold" />
          <span className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <span className="h-px w-5 bg-gold/50" />
        </div>
        {subtitle && (
          <p className={`font-sansBn text-sm mt-2 ${light ? "text-cream/65" : "text-night-text/60"}`}>{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className={`font-sansBn text-sm whitespace-nowrap transition ${light ? "text-gold hover:text-cream" : "text-coffee hover:text-gold"}`}
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}