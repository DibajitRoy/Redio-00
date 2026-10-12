import type { Metadata } from "next";
import { Noto_Serif_Bengali, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import VideoBox from "@/components/VideoBox";
import { PlayerProvider } from "@/context/PlayerContext";

const serifBn = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-bn",
});

const sansBn = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-bn",
});

export const metadata: Metadata = {
  title: "রেডিও ০০ | পুরোনো দিনের গান",
  description: "পুরোনো দিনের বাংলা গান, পুরোনো দিনের অনুভূতি — রেডিও ০০",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${serifBn.variable} ${sansBn.variable}`}>
      <body className="font-sansBn bg-night-bg text-night-text min-h-screen">
        <PlayerProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
          <Footer />
          <MusicPlayer />
          <VideoBox />
        </PlayerProvider>
      </body>
    </html>
  );
}