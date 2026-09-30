import { useEffect, useRef, useState } from "react";
import { musicConfig } from "../data/weddingData";

export function useMusic() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!musicConfig.enabled) return;

    const audio = new Audio(musicConfig.src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const startMusic = async () => {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setHasStarted(true);
    } catch {
      // Browser blocked autoplay without user gesture; can retry on click
      setIsPlaying(false);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasStarted(true);
      } catch (err) {
        console.error("Playback error:", err);
      }
    }
  };

  return {
    isPlaying,
    hasStarted,
    startMusic,
    toggleMusic,
  };
}
