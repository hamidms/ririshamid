"use client";

import { useState, useRef } from "react";

export function useAudioPlayer(src: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const fadeInAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    let vol = 0;

    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        vol += 0.05;
        if (vol >= 1) {
          audioRef.current.volume = 1;
          clearInterval(interval);
        } else {
          audioRef.current.volume = vol;
        }
      } else {
        clearInterval(interval);
      }
    }, 75);
  };

  const fadeOutAudio = (callback?: () => void) => {
    if (!audioRef.current) {
      callback?.();
      return;
    }

    let vol = audioRef.current.volume;
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) {
        vol -= 0.1;
        if (vol <= 0) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          clearInterval(interval);
          callback?.();
        } else {
          audioRef.current.volume = vol;
        }
      } else {
        clearInterval(interval);
      }
    }, 40);
  };

  const playAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        fadeInAudio();
      })
      .catch((err) => console.log("Audio playback error:", err));
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeOutAudio(() => setIsPlaying(false));
    } else {
      playAudio();
    }
  };

  return {
    audioRef,
    isPlaying,
    setIsPlaying,
    progress,
    playAudio,
    togglePlay,
    fadeOutAudio,
    fadeInAudio,
    handleTimeUpdate,
  };
}