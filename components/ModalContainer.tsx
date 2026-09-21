"use client";

import React, { useState, Suspense, lazy } from "react";

// Dynamic Import (Lazy Loading) untuk setiap Modal Box
const CalendarModalBox = lazy(() => import("@/components/CalendarModalBox"));
const BookModalBox = lazy(() => import("@/components/BookModalBox"));
const GalleryModalBox = lazy(() => import("@/components/GalleryModalBox"));
const PhoneModalBox = lazy(() => import("@/components/PhoneModalBox"));
const CoupleModalBox = lazy(() => import("@/components/CoupleModalBox"));
const GiftModalBox = lazy(() => import("@/components/GiftModalBox"));
const AudioModalBox = lazy(() => import("@/components/AudioModalBox"));
const RingModalBox = lazy(() => import("@/components/RingModalBox"));

interface ModalContainerProps {
  activeModel: string | null;
  setActiveModel: (model: string | null) => void;
  guestName: string | null;
  isGiftOpen: boolean;
  setIsGiftOpen: (open: boolean) => void;
  handleClosePhoneModal: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
  progress: number;
}

export default function ModalContainer({
  activeModel,
  setActiveModel,
  guestName,
  isGiftOpen,
  setIsGiftOpen,
  handleClosePhoneModal,
  isPlaying,
  togglePlay,
  progress,
}: ModalContainerProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <Suspense fallback={null}>
      {/* 
        Trik Performa: Hanya render elemen Modal saat benar-benar aktif/terbuka. 
        Ini menghemat memory RAM & GPU browser secara drastis.
      */}
      {activeModel === "Couple" && (
        <CoupleModalBox
          isOpen={true}
          onClose={() => setActiveModel(null)}
        />
      )}

      {activeModel === "Calendar" && (
        <CalendarModalBox
          isOpen={true}
          onClose={() => setActiveModel(null)}
        />
      )}

      {activeModel === "Ring" && (
        <RingModalBox
          isOpen={true}
          onClose={() => setActiveModel(null)}
        />
      )}

      {activeModel === "Book" && (
        <BookModalBox
          isOpen={true}
          onClose={() => setActiveModel(null)}
          onOpenGallery={() => {
            setActiveModel(null);
            setIsGalleryOpen(true);
          }}
        />
      )}

      {isGalleryOpen && (
        <GalleryModalBox
          isOpen={true}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}

      {activeModel === "Phone" && (
        <PhoneModalBox
          isOpen={true}
          onClose={handleClosePhoneModal}
          guestName={guestName}
        />
      )}

      {isGiftOpen && (
        <GiftModalBox
          isOpen={true}
          onClose={() => setIsGiftOpen(false)}
        />
      )}

      {activeModel === "Headphone" && (
        <AudioModalBox
          isOpen={true}
          onClose={() => setActiveModel(null)}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          progress={progress}
        />
      )}
    </Suspense>
  );
}