"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import Scene3D from "@/components/Scene3D";
import ModalContainer from "@/components/ModalContainer";
import WeddingCover from "@/components/WeddingCover";
import LoadingScreen from "@/components/LoadingScreen";
import NotFound from "./not-found";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

function HomeContent() {
  const searchParams = useSearchParams();
  const guestParam = searchParams.get("to") || searchParams.get("name");

  const [guestName, setGuestName] = useState<string | null>(null);
  const [isValidatingGuest, setIsValidatingGuest] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  // State Kontrol Transisi Layer Hitam & 404
  const [showBlackOverlay, setShowBlackOverlay] = useState(true);
  const [fadeBlackOverlay, setFadeBlackOverlay] = useState(false);
  const [renderNotFound, setRenderNotFound] = useState(false);
  const [fadeInNotFound, setFadeInNotFound] = useState(false);

  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [wasPlayingBeforeModal, setWasPlayingBeforeModal] = useState(false);

  // Ref untuk melacak apakah user sudah pernah membuka modal lain
  const hasOpenedOtherModalRef = useRef(false);

  const {
    audioRef,
    isPlaying,
    setIsPlaying,
    progress,
    playAudio,
    togglePlay,
    fadeOutAudio,
    fadeInAudio,
    handleTimeUpdate,
  } = useAudioPlayer("/audio/taruh.mp3");

  // Validasi Nama Tamu dari Supabase
  useEffect(() => {
    async function validateGuest() {
      if (!guestParam) {
        handleNotFoundTransition();
        return;
      }

      try {
        const { data, error } = await supabase
          .from("tamu")
          .select("nama")
          .ilike("nama", guestParam)
          .maybeSingle();

        if (error || !data) {
          handleNotFoundTransition();
        } else {
          setGuestName(data.nama);
          handleSuccessTransition();
        }
      } catch (err) {
        console.error("Error validating guest:", err);
        handleNotFoundTransition();
      }
    }

    validateGuest();
  }, [guestParam]);

  const handleSuccessTransition = () => {
    setIsValidatingGuest(false);
    setFadeBlackOverlay(true);
    setTimeout(() => {
      setShowBlackOverlay(false);
    }, 600);
  };

  const handleNotFoundTransition = () => {
    setIsNotFound(true);
    setIsValidatingGuest(false);
    setRenderNotFound(true);

    requestAnimationFrame(() => {
      setFadeInNotFound(true);
      setFadeBlackOverlay(true);
    });

    setTimeout(() => {
      setShowBlackOverlay(false);
    }, 600);
  };

  const handleSetActiveModel = (model: string | null) => {
    if (model !== null && model !== "Tanaman Bunga Matahari") {
      hasOpenedOtherModalRef.current = true;
    }
    setActiveModel(model);
  };

  const handleOpenGift = (open: boolean) => {
    if (open) {
      if (hasOpenedOtherModalRef.current) {
        setIsGiftOpen(true);
      } else {
        console.log("Harus membuka modal lain terlebih dahulu!");
      }
    } else {
      setIsGiftOpen(false);
    }
  };

  const isAnyModalOpen = isCoverOpen || isLoading || activeModel !== null || isGiftOpen;

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
    setIsLoading(true);
    playAudio();

    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsFadingOut(false);
      }, 800);
    }, 2000);
  };

  const handleOpenPhoneModal = () => {
    hasOpenedOtherModalRef.current = true;
    setWasPlayingBeforeModal(isPlaying);

    if (isPlaying) {
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
        .then(() => fadeInAudio())
        .catch((err) => console.log(err));
      setIsPlaying(true);
    }

    setWasPlayingBeforeModal(false);
  };

  if (renderNotFound) {
    return (
      <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#000000" }}>
        <div
          style={{
            opacity: fadeInNotFound ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            width: "100%",
            height: "100%",
          }}
        >
          <NotFound />
        </div>

        {showBlackOverlay && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "#000000",
              zIndex: 999999,
              opacity: fadeBlackOverlay ? 0 : 1,
              transition: "opacity 0.6s ease-in-out",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {showBlackOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000000",
            zIndex: 999999,
            opacity: fadeBlackOverlay ? 0 : 1,
            transition: "opacity 0.6s ease-in-out",
            pointerEvents: "none",
          }}
        />
      )}

      <audio
        ref={audioRef}
        src="/audio/taruh.mp3"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <main
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/gallery/assets/background.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <Scene3D
          setActiveModel={handleSetActiveModel}
          handleOpenPhoneModal={handleOpenPhoneModal}
          setIsGiftOpen={handleOpenGift}
          setIsInteracting={setIsInteracting}
        />

        {/* FOOTER "Made with 🤍 for my bini" DI TENGAH BAWAH */}
        <div
          style={{
            position: "fixed",
            bottom: "16px",
            left: "50%",
            transform: "translateX(-50%)",
            height: "28px",
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "9999px",
            padding: "0 14px",
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
            whiteSpace: "nowrap",
            maxWidth: "90vw",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: isInteracting || isAnyModalOpen ? 0 : 1,
          }}
        >
          <span>Made with</span>
          <span style={{ color: "#ffffff", fontSize: "0.75rem", display: "inline-flex", alignItems: "center" }}>
            🤍
          </span>
          <span>for my bini</span>
        </div>

        {/* TOMBOL MUTE / PLAY AUDIO DI KANAN BAWAH (HANYA IKON) */}
        <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
        style={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            width: "28px",
            height: "28px",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "9999px",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            zIndex: 50,
            transition: "all 0.15s ease",
            opacity: isInteracting || isAnyModalOpen ? 0 : 1,
            pointerEvents: isInteracting || isAnyModalOpen ? "none" : "auto",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.90)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.90)")}
        onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
        {isPlaying ? (
            /* Ikon Speaker Aktif / Volume On */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
        ) : (
            /* Ikon Speaker Mute / Off */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23"></line>
            <path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a2 2 0 0 0-3.54-1.3L8.68 5.48"></path>
            <path d="M17 11a5 5 0 0 1 0 2M19 7a9 9 0 0 1 0 10"></path>
            </svg>
        )}
        </button>
      </main>

      <ModalContainer
        activeModel={activeModel}
        setActiveModel={handleSetActiveModel}
        guestName={guestName}
        isGiftOpen={isGiftOpen}
        setIsGiftOpen={handleOpenGift}
        handleClosePhoneModal={handleClosePhoneModal}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progress={progress}
      />

      {isCoverOpen && (
        <Suspense fallback={null}>
          <WeddingCover onOpen={handleOpenInvitation} guestName={guestName} />
        </Suspense>
      )}

      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ width: "100vw", height: "100vh", backgroundColor: "#000000" }} />}>
      <HomeContent />
    </Suspense>
  );
}