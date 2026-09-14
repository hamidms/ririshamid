"use client";

import React, { useState } from "react";
import CalendarModalBox from "@/components/CalendarModalBox";
import BookModalBox from "@/components/BookModalBox";
import GalleryModalBox from "@/components/GalleryModalBox";
import PhoneModalBox from "@/components/PhoneModalBox";
import CoupleModalBox from "@/components/CoupleModalBox";
import GiftModalBox from "@/components/GiftModalBox";
import AudioModalBox from "@/components/AudioModalBox";
import RingModalBox from "@/components/RingModalBox"; // 1. Import RingModalBox

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
    <>
      <CoupleModalBox isOpen={activeModel === "Couple"} onClose={() => setActiveModel(null)} />
      <CalendarModalBox isOpen={activeModel === "Calendar"} onClose={() => setActiveModel(null)} />
      
      {/* 2. Modal Box untuk Ring */}
      <RingModalBox isOpen={activeModel === "Ring"} onClose={() => setActiveModel(null)} />

      <BookModalBox
        isOpen={activeModel === "Book"}
        onClose={() => setActiveModel(null)}
        onOpenGallery={() => {
          setActiveModel(null);
          setIsGalleryOpen(true);
        }}
      />

      <GalleryModalBox
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
      
      <PhoneModalBox 
        isOpen={activeModel === "Phone"} 
        onClose={handleClosePhoneModal}
        guestName={guestName} 
      />
      
      <GiftModalBox isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />

      <AudioModalBox
        isOpen={activeModel === "Headphone"}
        onClose={() => setActiveModel(null)}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progress={progress}
      />
    </>
  );
}