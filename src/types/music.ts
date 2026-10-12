export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId?: string;
  albumName?: string;
  movie?: string;
  year?: number;
  duration: string; // "04:32"
  youtubeId: string;
  moodIds: string[];
}

// YouTube video id থেকে thumbnail
export function songThumbnail(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export interface Artist {
  id: string;
  name: string;
  photo: string;
  bio: string;
  songCount: number;
}

export interface Album {
  id: string;
  name: string;
  cover: string;
  year: number;
  type: "সিনেমার গান" | "অ্যালবাম";
  artistName: string;
  songIds: string[];
}

export interface Mood {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}