"use client";

import { Song } from "@/types/music";
import { songs } from "@/data/songs";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface PlayerContextValue {
  current: Song | null;
  queue: Song[];
  isPlaying: boolean;
  progress: number;
  duration: number;
  elapsed: number;
  favorites: string[];
  videoBoxOpen: boolean;

  playSong: (song: Song, queue?: Song[]) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (fraction: number) => void;

  toggleFavorite: (songId: string) => void;
  isFavorite: (songId: string) => boolean;

  toggleVideoBox: () => void;
}

const PlayerContext =
  createContext<PlayerContextValue | null>(null);

export function PlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [current, setCurrent] =
    useState<Song | null>(null);

  const [queue, setQueue] =
    useState<Song[]>(songs);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [duration, setDuration] =
    useState(0);

  const [elapsed, setElapsed] =
    useState(0);

  const [favorites, setFavorites] =
    useState<string[]>([]);

  const [videoBoxOpen, setVideoBoxOpen] =
    useState(true);

  // -----------------------------------------
  // Refs
  // -----------------------------------------

  const playerRef = useRef<any>(null);

  const readyRef = useRef(false);

  const pendingIdRef =
    useRef<string | null>(null);

  const intervalRef =
    useRef<ReturnType<typeof setInterval> | null>(
      null
    );

  const currentRef =
    useRef<Song | null>(null);

  const queueRef =
    useRef<Song[]>(songs);

  const playSongRef = useRef<
    ((song: Song, newQueue?: Song[]) => void) | null
  >(null);

  // -----------------------------------------
  // Keep refs updated
  // -----------------------------------------

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  // -----------------------------------------
  // Favorites - Load
  // -----------------------------------------

  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(
          "radio00-favorites"
        );

      if (raw) {
        setFavorites(
          JSON.parse(raw)
        );
      }
    } catch {
      // Ignore
    }
  }, []);

  // -----------------------------------------
  // Favorites - Save
  // -----------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(
        "radio00-favorites",
        JSON.stringify(favorites)
      );
    } catch {
      // Ignore
    }
  }, [favorites]);

  // -----------------------------------------
  // Stop progress ticker
  // -----------------------------------------

  const stopTicker =
    useCallback(() => {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        );

        intervalRef.current =
          null;
      }
    }, []);

  // -----------------------------------------
  // Start progress ticker
  // -----------------------------------------

  const startTicker =
    useCallback(() => {
      stopTicker();

      intervalRef.current =
        setInterval(() => {
          if (
            playerRef.current &&
            typeof playerRef.current
              .getCurrentTime ===
              "function"
          ) {
            const time =
              playerRef.current
                .getCurrentTime();

            if (
              typeof time ===
              "number"
            ) {
              setElapsed(time);
            }
          }
        }, 500);
    }, [stopTicker]);

  // -----------------------------------------
  // Queue shifting
  // -----------------------------------------

  const shiftQueue =
    useCallback(
      (direction: 1 | -1) => {
        const activeSong =
          currentRef.current;

        const activeQueue =
          queueRef.current;

        if (
          !activeSong ||
          activeQueue.length === 0
        ) {
          return;
        }

        const currentIndex =
          activeQueue.findIndex(
            (song) =>
              song.id ===
              activeSong.id
          );

        if (currentIndex === -1) {
          return;
        }

        const nextIndex =
          (currentIndex +
            direction +
            activeQueue.length) %
          activeQueue.length;

        const nextSong =
          activeQueue[nextIndex];

        if (nextSong) {
          playSongRef.current?.(
            nextSong
          );
        }
      },
      []
    );

  // -----------------------------------------
  // Next
  // -----------------------------------------

  const next =
    useCallback(() => {
      shiftQueue(1);
    }, [shiftQueue]);

  // -----------------------------------------
  // Previous
  // -----------------------------------------

  const prev =
    useCallback(() => {
      shiftQueue(-1);
    }, [shiftQueue]);

  // -----------------------------------------
  // Initialize YouTube player
  // -----------------------------------------

  const initPlayer =
    useCallback(() => {
      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }

      if (
        !window.YT ||
        !window.YT.Player
      ) {
        return;
      }

      if (playerRef.current) {
        return;
      }

      const container =
        document.getElementById(
          "radio00-yt-player"
        );

      if (!container) {
        console.warn(
          "Radio00: YouTube container not found."
        );

        return;
      }

      console.log(
        "Radio00: Initializing YouTube player..."
      );

      playerRef.current =
        new window.YT.Player(
          "radio00-yt-player",
          {
            width: "320",
            height: "180",

            playerVars: {
              playsinline: 1,
              enablejsapi: 1,
              origin:
                window.location.origin,
              rel: 0,
            },

            events: {
              // -------------------------------
              // YouTube Ready
              // -------------------------------

              onReady: () => {
                console.log(
                  "Radio00: YouTube player ready."
                );

                readyRef.current =
                  true;

                if (
                  pendingIdRef.current
                ) {
                  const videoId =
                    pendingIdRef.current;

                  pendingIdRef.current =
                    null;

                  console.log(
                    "Radio00: Loading pending video:",
                    videoId
                  );

                  playerRef.current.loadVideoById(
                    videoId
                  );
                }
              },

              // -------------------------------
              // YouTube State Change
              // -------------------------------

              onStateChange: (
                event: any
              ) => {
                if (!window.YT) {
                  return;
                }

                // Playing
                if (
                  event.data ===
                  window.YT.PlayerState.PLAYING
                ) {
                  console.log(
                    "Radio00: YouTube PLAYING"
                  );

                  setIsPlaying(true);

                  if (
                    playerRef.current
                  ) {
                    const videoDuration =
                      playerRef.current.getDuration();

                    if (
                      typeof videoDuration ===
                        "number" &&
                      videoDuration > 0
                    ) {
                      setDuration(
                        videoDuration
                      );
                    }
                  }

                  startTicker();
                }

                // Paused
                else if (
                  event.data ===
                  window.YT.PlayerState.PAUSED
                ) {
                  console.log(
                    "Radio00: YouTube PAUSED"
                  );

                  setIsPlaying(false);

                  stopTicker();
                }

                // Ended
                else if (
                  event.data ===
                  window.YT.PlayerState.ENDED
                ) {
                  console.log(
                    "Radio00: YouTube ENDED"
                  );

                  setIsPlaying(false);

                  stopTicker();

                  next();
                }

                // Buffering
                else if (
                  event.data ===
                  window.YT.PlayerState.BUFFERING
                ) {
                  console.log(
                    "Radio00: YouTube BUFFERING"
                  );
                }
              },

              // -------------------------------
              // YouTube Error
              // -------------------------------

              onError: (
                event: any
              ) => {
                console.error(
                  "YouTube Player Error:",
                  event.data
                );

                const errorMessages: Record<
                  number,
                  string
                > = {
                  2:
                    "Invalid YouTube video ID.",

                  5:
                    "HTML5 YouTube player error.",

                  100:
                    "Video not found, removed, or private.",

                  101:
                    "Video owner does not allow embedding.",

                  150:
                    "Video owner does not allow embedding.",

                  153:
                    "Missing HTTP Referer or API client identification.",
                };

                console.error(
                  "Radio00:",
                  errorMessages[
                    event.data
                  ] ??
                    `Unknown YouTube error: ${event.data}`
                );

                setIsPlaying(false);

                stopTicker();
              },
            },
          }
        );
    }, [
      next,
      startTicker,
      stopTicker,
    ]);

  // -----------------------------------------
  // Load YouTube IFrame API
  // -----------------------------------------

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    // API already loaded
    if (
      window.YT &&
      window.YT.Player
    ) {
      initPlayer();

      return;
    }

    // Check existing script
    const existingScript =
      document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]'
      );

    if (existingScript) {
      window.onYouTubeIframeAPIReady =
        () => {
          initPlayer();
        };

      return;
    }

    console.log(
      "Radio00: Loading YouTube IFrame API..."
    );

    const script =
      document.createElement(
        "script"
      );

    script.src =
      "https://www.youtube.com/iframe_api";

    script.async = true;

    document.body.appendChild(
      script
    );

    window.onYouTubeIframeAPIReady =
      () => {
        console.log(
          "Radio00: YouTube IFrame API loaded."
        );

        initPlayer();
      };

    return () => {
      stopTicker();
    };
  }, [
    initPlayer,
    stopTicker,
  ]);

  // -----------------------------------------
  // Play Song
  // -----------------------------------------

  const playSong =
    useCallback(
      (
        song: Song,
        newQueue?: Song[]
      ) => {
        console.log(
          "Radio00: Playing:",
          song.title
        );

        console.log(
          "Radio00: YouTube ID:",
          song.youtubeId
        );

        setCurrent(song);

        currentRef.current =
          song;

        setVideoBoxOpen(true);

        if (newQueue) {
          setQueue(newQueue);

          queueRef.current =
            newQueue;
        }

        setElapsed(0);

        setDuration(0);

        if (
          readyRef.current &&
          playerRef.current
        ) {
          console.log(
            "Radio00: Loading YouTube video:",
            song.youtubeId
          );

          playerRef.current.loadVideoById(
            song.youtubeId
          );
        } else {
          console.log(
            "Radio00: Player not ready. Waiting..."
          );

          pendingIdRef.current =
            song.youtubeId;
        }
      },
      []
    );

  // Store playSong in ref
  useEffect(() => {
    playSongRef.current =
      playSong;
  }, [playSong]);

  // -----------------------------------------
  // Toggle Play / Pause
  // -----------------------------------------

  const togglePlay =
    useCallback(() => {
      if (!playerRef.current) {
        console.warn(
          "Radio00: YouTube player not ready."
        );

        return;
      }

      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }, [isPlaying]);

  // -----------------------------------------
  // Seek
  // -----------------------------------------

  const seekTo =
    useCallback(
      (fraction: number) => {
        if (
          !playerRef.current ||
          !duration
        ) {
          return;
        }

        const safeFraction =
          Math.min(
            1,
            Math.max(
              0,
              fraction
            )
          );

        const time =
          safeFraction *
          duration;

        playerRef.current.seekTo(
          time,
          true
        );

        setElapsed(time);
      },
      [duration]
    );

  // -----------------------------------------
  // Toggle Favorite
  // -----------------------------------------

  const toggleFavorite =
    useCallback(
      (songId: string) => {
        setFavorites(
          (previous) => {
            if (
              previous.includes(
                songId
              )
            ) {
              return previous.filter(
                (id) =>
                  id !== songId
              );
            }

            return [
              ...previous,
              songId,
            ];
          }
        );
      },
      []
    );

  // -----------------------------------------
  // Check Favorite
  // -----------------------------------------

  const isFavorite =
    useCallback(
      (songId: string) => {
        return favorites.includes(
          songId
        );
      },
      [favorites]
    );

  // -----------------------------------------
  // Toggle Video Box
  // -----------------------------------------

  const toggleVideoBox =
    useCallback(() => {
      setVideoBoxOpen(
        (previous) =>
          !previous
      );
    }, []);

  // -----------------------------------------
  // Progress
  // -----------------------------------------

  const progress =
    duration > 0
      ? Math.min(
          1,
          Math.max(
            0,
            elapsed / duration
          )
        )
      : 0;

  // -----------------------------------------
  // Provider
  // -----------------------------------------

  return (
    <PlayerContext.Provider
      value={{
        current,
        queue,
        isPlaying,
        progress,
        duration,
        elapsed,
        favorites,
        videoBoxOpen,

        playSong,
        togglePlay,

        next,
        prev,

        seekTo,

        toggleFavorite,
        isFavorite,

        toggleVideoBox,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

// -----------------------------------------
// usePlayer Hook
// -----------------------------------------

export function usePlayer() {
  const context =
    useContext(
      PlayerContext
    );

  if (!context) {
    throw new Error(
      "usePlayer must be used within PlayerProvider"
    );
  }

  return context;
}