import AlbumCard from "@/components/AlbumCard";
import { albums } from "@/data/albums";

export default function MoviesPage() {
  const movieAlbums = albums.filter((a) => a.type === "সিনেমার গান");

  return (
    <div>
      <h1 className="font-serifBn text-2xl text-night-text mb-1">সিনেমার গান</h1>
      <p className="font-sansBn text-sm text-night-text/60 mb-6">বাংলা সিনেমায় সেই সব স্মরণীয় সুর</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movieAlbums.map((a) => (
          <AlbumCard key={a.id} album={a} />
        ))}
      </div>
    </div>
  );
}