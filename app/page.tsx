"use client";

import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import BookModel from "@/components/BookModel";
import SunflowerModel from "@/components/SunflowerModel";
import ShoesModel from "@/components/ShoesModel";
import HeelsModel from "@/components/HeelsModel";
import HeadphoneModel from "@/components/HeadphoneModel";
import PhoneModel from "@/components/PhoneModel";
import CalendarModel from "@/components/CalendarModel";
import RingModel from "@/components/RingModel";
import GrassModel from "@/components/GrassModel";

import CalendarModalBox from "@/components/CalendarModalBox";
import BookModalBox from "@/components/BookModalBox";
import PhoneModalBox from "@/components/PhoneModalBox";
import CoupleModalBox from "@/components/CoupleModalBox";
import GiftModalBox from "@/components/GiftModalBox";
import AudioModalBox from "@/components/AudioModalBox";
import WeddingCover from "@/components/WeddingCover";
import LoadingScreen from "@/components/LoadingScreen";

// =========================================================================
// SUB-KOMPONEN KONTROL ROTASI DENGAN EFEK FADE / ACCELERATION
// =========================================================================
function SmoothOrbitControls({
  shouldRotate,
  onStart,
  onEnd,
}: {
  shouldRotate: boolean;
  onStart: () => void;
  onEnd: () => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  
  // Kecepatan target saat berputar (0.5 = lambat dan elegan)
  const TARGET_SPEED = 0.5; 
  // Ref untuk menyimpan kecepatan saat ini secara presisi
  const currentSpeedRef = useRef(0);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    // Tentukan kecepatan tujuan: jika harus berputar -> TARGET_SPEED, jika tidak -> 0
    const target = shouldRotate ? TARGET_SPEED : 0;

    // LERP (Linear Interpolation) untuk efek percepatan/perlambatan halus (fade in/out)
    // Angka 2.0 menentukan seberapa halus transisinya (makin kecil makin halus)
    currentSpeedRef.current += (target - currentSpeedRef.current) * (delta * 2.0);

    // Terapkan kecepatan ke OrbitControls
    controlsRef.current.autoRotateSpeed = currentSpeedRef.current;
    
    // Aktifkan autoRotate jika kecepatannya masih di atas 0.001
    controlsRef.current.autoRotate = currentSpeedRef.current > 0.001;
    
    // Penting: Update kontrol tiap frame agar transisi ter-render mulus
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.15}
      minZoom={50}
      maxZoom={250}
      maxPolarAngle={Math.PI / 1}
      onStart={onStart}
      onEnd={onEnd}
    />
  );
}

// =========================================================================
// SUB-KOMPONEN SCENE 3D
// =========================================================================
function Scene3D({
  setActiveModel,
  handleOpenPhoneModal,
  setIsGiftOpen,
}: {
  setActiveModel: (model: string | null) => void;
  handleOpenPhoneModal: () => void;
  setIsGiftOpen: (open: boolean) => void;
}) {
  const [shouldRotate, setShouldRotate] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dipanggil saat user mulai menyentuh/menggeser/drag layar
  const handleStart = () => {
    // Stop status rotasi (kecepatan akan melambat halus ke 0)
    setShouldRotate(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Dipanggil saat user melepas sentuhan/mouse setelah drag/scroll
  const handleEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Hitung mundur 5 detik (5000 ms) setelah lepas sentuhan, baru berputar perlahan lagi
    timeoutRef.current = setTimeout(() => {
      setShouldRotate(true);
    }, 5000);
  };

  return (
    <>
      <OrthographicCamera makeDefault position={[12, 12, 12]} zoom={110} near={0.1} far={1000} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} />

      <Suspense fallback={null}>
        <group position={[0, -3, 0]}>
          <GrassModel />
        </group>

        <group position={[0.1, -2, 0.2]} rotation={[0, 1.5, 0]}>
          <ShoesModel onSelect={() => setActiveModel("Couple")} />
        </group>

        <group position={[-1, -2.3, 0.2]} rotation={[0, -0.4, 0]}>
          <HeelsModel onSelect={() => setActiveModel("Couple")} />
        </group>

        <group position={[1.8, -2, -1]} rotation={[0, -0.5, 0]}>
          <BookModel onSelect={() => setActiveModel("Book")} />
        </group>

        <group position={[1.8, -2.2, 0.5]} rotation={[Math.PI / 2, 3, Math.PI / 3]}>
          <PhoneModel onSelect={handleOpenPhoneModal} />
        </group>

        <group position={[0, -2.4, -1.2]}>
          <SunflowerModel
            onSelect={() => {
              setActiveModel("Tanaman Bunga Matahari");
              setIsGiftOpen(true);
            }}
          />
        </group>

        <group position={[-1, -2, 0.5]} rotation={[0, 0, 1.5]}>
          <HeadphoneModel onSelect={() => setActiveModel("Headphone")} />
        </group>

        <group position={[-2, -2.3, 1.5]} rotation={[0, 1, 0]}>
          <CalendarModel onSelect={() => setActiveModel("Calendar")} />
        </group>

        <group position={[0.4, -2.3, 1]} rotation={[0, 0, 0]}>
          <RingModel onSelect={() => setActiveModel("Cincin Aksesoris Emas")} />
        </group>
      </Suspense>

      <SmoothOrbitControls
        shouldRotate={shouldRotate}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </>
  );
}

// =========================================================================
// KOMPONEN UTAMA
// =========================================================================
export default function Home() {
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [wasPlayingBeforeModal, setWasPlayingBeforeModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    setIsLoading(true);

    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeInAudio();
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    }

    setTimeout(() => {
      setIsFadingOut(true);

      setTimeout(() => {
        setIsLoading(false);
        setIsFadingOut(false);
      }, 800);
    }, 2000);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        fadeOutAudio(() => {
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(true);
        audioRef.current.volume = 0;
        audioRef.current
          .play()
          .then(() => {
            fadeInAudio();
          })
          .catch((err) => {
            console.log("Gagal memutar audio:", err);
            setIsPlaying(false);
          });
      }
    }
  };

  const fadeInAudio = () => {
    if (audioRef.current) {
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
    }
  };

  const fadeOutAudio = (callback: () => void) => {
    if (audioRef.current) {
      let vol = audioRef.current.volume;

      const interval = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          vol -= 0.1;
          if (vol <= 0) {
            audioRef.current.volume = 0;
            audioRef.current.pause();
            clearInterval(interval);
            callback();
          } else {
            audioRef.current.volume = vol;
          }
        } else {
          clearInterval(interval);
        }
      }, 40);
    } else {
      callback();
    }
  };

  const handleOpenPhoneModal = () => {
    setWasPlayingBeforeModal(isPlaying);

    if (isPlaying && audioRef.current) {
      fadeOutAudio(() => {
        setIsPlaying(false);
        setActiveModel("Phone");
      });
    } else {
      setActiveModel("Phone");
    }
  };

  const handleClosePhoneModal = () => {
    setActiveModel(null);

    if (wasPlayingBeforeModal && audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          fadeInAudio();
        })
        .catch((err) => console.log(err));
      setIsPlaying(true);
    }

    setWasPlayingBeforeModal(false);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <audio
        ref={audioRef}
        src="/audio/taruh.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <main style={{ width: "100vw", height: "100vh", backgroundColor: "#ee8cde", position: "relative" }}>
        <Canvas>
          <Scene3D
            setActiveModel={setActiveModel}
            handleOpenPhoneModal={handleOpenPhoneModal}
            setIsGiftOpen={setIsGiftOpen}
          />
        </Canvas>
      </main>

      <CoupleModalBox isOpen={activeModel === "Couple"} onClose={() => setActiveModel(null)} />
      <CalendarModalBox isOpen={activeModel === "Calendar"} onClose={() => setActiveModel(null)} />
      <BookModalBox isOpen={activeModel === "Book"} onClose={() => setActiveModel(null)} />
      <PhoneModalBox isOpen={activeModel === "Phone"} onClose={handleClosePhoneModal} />
      <GiftModalBox isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />

      <AudioModalBox
        isOpen={activeModel === "Headphone"}
        onClose={() => setActiveModel(null)}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progress={progress}
      />

      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

      {isCoverOpen && (
        <Suspense fallback={<div style={{ backgroundColor: "#000", width: "100vw", height: "100vh" }} />}>
          <WeddingCover onOpen={handleOpenInvitation} />
        </Suspense>
      )}
    </div>
  );
}