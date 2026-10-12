import ArtistCard from "@/components/ArtistCard";
import { artists } from "@/data/artists";

export default function ArtistsPage() {
  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">সুরের কারিগর</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">যাদের কণ্ঠে বেঁচে আছে আমাদের সময়ের স্মৃতি</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {artists.map((a) => (
          <ArtistCard key={a.id} artist={a} />
        ))}
      </div>
    </div>
  );
}