import React, { useEffect, useRef } from "react";
import { videoConfig } from "../../data/weddingData";

interface BackgroundVideoProps {
  invitationOpened: boolean;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ invitationOpened }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoConfig.enabled) return;

    if (invitationOpened) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video play was prevented:", err);
        });
      }
    } else {
      video.pause();
    }
  }, [invitationOpened]);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none -z-50 overflow-hidden bg-stone-950"
      aria-hidden="true"
    >
      {/* Cinematic Background Video Element */}
      {videoConfig.enabled && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000"
          muted
          loop
          playsInline
          poster={videoConfig.poster}
          preload="auto"
        >
          {videoConfig.webm && (
            <source src={videoConfig.webm} type="video/webm" />
          )}
          {videoConfig.mp4 && (
            <source src={videoConfig.mp4} type="video/mp4" />
          )}
        </video>
      )}

      {/* Cinematic Color Grading & Multi-layer Scrim Overlays */}
      {/* 1. Base dark tint to ground luminance */}
      <div className="absolute inset-0 bg-stone-950/65 mix-blend-multiply" />

      {/* 2. Rich cinematic vertical gradient to ensure perfect WCAG text contrast across all viewports */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950/85 via-stone-950/70 to-stone-950/90" />

      {/* 3. Subtle warm golden hour aura & ambient radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.08)_0%,rgba(12,10,9,0.75)_80%)]" />

      {/* 4. Fine filmic grain texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
