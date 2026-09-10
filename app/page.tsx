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
  const TARGET_SPEED = 0.5;
  const currentSpeedRef = useRef(0);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    const target = shouldRotate ? TARGET_SPEED : 0;
    currentSpeedRef.current += (target - currentSpeedRef.current) * (delta * 2.0);

    controlsRef.current.autoRotateSpeed = currentSpeedRef.current;
    controlsRef.current.autoRotate = currentSpeedRef.current > 0.001;
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.15}
      minZoom={50}
      maxZoom={250}
      maxPolarAngle={Math.PI / 2.5}
      minPolarAngle={Math.PI / 6}
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
  setIsInteracting,
}: {
  setActiveModel: (model: string | null) => void;
  handleOpenPhoneModal: () => void;
  setIsGiftOpen: (open: boolean) => void;
  setIsInteracting: (interacting: boolean) => void;
}) {
  const [shouldRotate, setShouldRotate] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    setShouldRotate(false);
    setIsInteracting(true); // Sembunyikan footer saat pengguna berinteraksi / drag

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleEnd = () => {
    setIsInteracting(false); // Tampilkan kembali footer saat sentuhan dilepas

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShouldRotate(true);
    }, 5000);
  };

  return (
    <>
      <OrthographicCamera 
        makeDefault 
        position={[8, 18, 10]} 
        zoom={85} 
        near={0.1} 
        far={1000} 
      />

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
        // target={[0, -1.2, 0]} // Ubah target Y menjadi minus (misal -1.2 atau -1.5)
        // maxPolarAngle={Math.PI / 3}
        // minPolarAngle={Math.PI / 6}
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

  // State untuk melacak interaksi pengguna
  const [isInteracting, setIsInteracting] = useState(false);

  // Cek apakah ada modal atau cover yang sedang aktif
  const isAnyModalOpen =
    isCoverOpen ||
    isLoading ||
    activeModel !== null ||
    isGiftOpen;

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
            setIsInteracting={setIsInteracting}
          />
        </Canvas>

        {/* FOOTER MENGAMBANG TRANSPARAN */}
        {/* FOOTER MENGAMBANG TRANSPARAN */}
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "9999px",
            padding: "5px 14px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            fontSize: "0.72rem",
            fontWeight: "500",
            letterSpacing: "0.2px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
            pointerEvents: "none",
            whiteSpace: "nowrap", // Memastikan teks tetap 1 baris
            maxWidth: "90vw",     // Menyesuaikan lebar layar HP
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: isInteracting || isAnyModalOpen ? 0 : 1,
            transform: isInteracting || isAnyModalOpen 
              ? "translate(-50%, 15px)" 
              : "translate(-50%, 0)",
          }}
        >
          <span>Made with</span>
          <span style={{ color: "#ffffff", fontSize: "0.75rem", display: "inline-flex", alignItems: "center" }}>
            🤍
          </span>
          <span>for my bini</span>
        </div>
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