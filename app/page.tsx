"use client";

import React, { useState, useEffect, Suspense } from "react";
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

  // Transisi jika nama VALID
  const handleSuccessTransition = () => {
    setIsValidatingGuest(false);
    setFadeBlackOverlay(true);
    setTimeout(() => {
      setShowBlackOverlay(false);
    }, 600);
  };

  // Transisi mulus jika nama TIDAK VALID / 404
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

  // RENDER HALAMAN 404
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

      <main style={{ width: "100vw", height: "100vh", backgroundColor: "#ee8cde", position: "relative" }}>
        <Scene3D
          setActiveModel={setActiveModel}
          handleOpenPhoneModal={handleOpenPhoneModal}
          setIsGiftOpen={setIsGiftOpen}
          setIsInteracting={setIsInteracting}
        />

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
      </main>

      <ModalContainer
        activeModel={activeModel}
        setActiveModel={setActiveModel}
        guestName={guestName}
        isGiftOpen={isGiftOpen}
        setIsGiftOpen={setIsGiftOpen}
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

// BUNGKUS DENGAN SUSPENSE UNTUK MENGHINDARI BUILD ERROR NEXT.JS
export default function Home() {
  return (
    <Suspense fallback={<div style={{ width: "100vw", height: "100vh", backgroundColor: "#000000" }} />}>
      <HomeContent />
    </Suspense>
  );
}