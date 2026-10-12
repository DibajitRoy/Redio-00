"use client";

import { usePlayer } from "@/context/PlayerContext";

export default function VideoBox() {
  const { current, videoBoxOpen, toggleVideoBox } = usePlayer();

  const showBox = !!current && videoBoxOpen;

  return (
    <>
      <div
        className={`videobox-wrap ${
          showBox ? "videobox-open" : "videobox-closed"
        }`}
      >
        <div className="videobox-frame">
          {current && (
            <div className="videobox-header">
              <span className="videobox-title">
                {current.title}
              </span>

              <button
                onClick={toggleVideoBox}
                aria-label="ছোট করুন"
                className="videobox-btn"
              >
                –
              </button>
            </div>
          )}

          <div className="videobox-stage">
            {/*
              YouTube IFrame API এই element-এর ভিতরে
              player তৈরি করবে।
            */}
            <div
              id="radio00-yt-player"
              className="w-full aspect-video"
            />
          </div>
        </div>
      </div>

      {current && !videoBoxOpen && (
        <button
          onClick={toggleVideoBox}
          className="videobox-reopen"
          aria-label="ভিডিও দেখুন"
        >
          📻
        </button>
      )}
    </>
  );
}