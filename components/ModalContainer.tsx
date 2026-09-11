"use client";

import React from "react";
import CalendarModalBox from "@/components/CalendarModalBox";
import BookModalBox from "@/components/BookModalBox";
import PhoneModalBox from "@/components/PhoneModalBox";
import CoupleModalBox from "@/components/CoupleModalBox";
import GiftModalBox from "@/components/GiftModalBox";
import AudioModalBox from "@/components/AudioModalBox";

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
  return (
    <>
      <CoupleModalBox isOpen={activeModel === "Couple"} onClose={() => setActiveModel(null)} />
      <CalendarModalBox isOpen={activeModel === "Calendar"} onClose={() => setActiveModel(null)} />
      <BookModalBox isOpen={activeModel === "Book"} onClose={() => setActiveModel(null)} />
      
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