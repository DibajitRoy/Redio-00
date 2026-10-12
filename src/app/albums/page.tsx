import AlbumCard from "@/components/AlbumCard";
import { albums } from "@/data/albums";

export default function AlbumsPage() {
  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">অ্যালবাম</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">সময়ের সাক্ষী কিছু অ্যালবাম ও সিনেমার গান</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {albums.map((a) => (
          <AlbumCard key={a.id} album={a} />
        ))}
      </div>
    </div>
  );
}