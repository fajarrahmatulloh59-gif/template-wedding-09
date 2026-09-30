import { useEffect, useRef, useState } from "react";
import { videoConfig } from "../data/weddingData";

export function useBackgroundVideo(invitationOpened: boolean) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!invitationOpened || !videoRef.current || !videoConfig.enabled) return;

    const playVideo = async () => {
      try {
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn("Background video autoplay waiting for user interaction:", err);
      }
    };

    playVideo();
  }, [invitationOpened]);

  return {
    videoRef,
    isPlaying,
    isLoaded,
    setIsLoaded,
  };
}
