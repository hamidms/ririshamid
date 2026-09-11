"use client";

import React, { Suspense } from "react";

interface WeddingCoverProps {
  onOpen: () => void;
  guestName?: string | null;
}

function CoverContent({ onOpen, guestName: guestNameProp }: WeddingCoverProps) {
  // Hanya gunakan nama dari props (yang sudah divalidasi Supabase).
  // Jika null/empty, gunakan default "Tamu Undangan" tanpa membaca query URL secara langsung.
  const guestName = guestNameProp || "Tamu Undangan";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "50px 24px 30px 24px",
        color: "#ffffff",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE WITH BLUR & OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.75)), url('/gallery/couple/couple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
          transform: "scale(1.05)",
          zIndex: -1,
        }}
      />

      {/* 1. BAGIAN ATAS: JUDUL ACARA */}
      <div style={{ marginTop: "20px" }}>
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "0.9rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            opacity: 0.9,
            marginBottom: "15px",
            textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          The Wedding of
        </p>
        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.8rem",
            fontWeight: "normal",
            margin: 0,
            letterSpacing: "2px",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          Riris & Hamid
        </h1>
      </div>

      {/* 2. BAGIAN TENGAH DIBUAT KOSONG */}
      <div style={{ flex: 1 }} />

      {/* 3. BAGIAN BAWAH: DATA TAMU DAN ACTION BUTTON */}
      <div
        style={{
          width: "100%",
          maxWidth: "360px",
          boxSizing: "border-box",
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontSize: "0.85rem",
            opacity: 0.85,
            margin: "0 0 12px 0",
            letterSpacing: "0.5px",
          }}
        >
          Kepada Bapak/Ibu/Saudara/i
        </p>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#f1c40f",
            margin: "0 0 16px 0",
            textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {guestName}
        </h2>

        <p
          style={{
            fontSize: "0.82rem",
            lineHeight: "1.6",
            opacity: 0.9,
            margin: "0 0 30px 0",
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir di
          acara pernikahan kami.
        </p>

        <button
          onClick={onOpen}
          style={{
            backgroundColor: "#ffffff",
            color: "#1e272e",
            border: "none",
            padding: "14px 40px",
            fontSize: "0.9rem",
            fontWeight: "600",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
            letterSpacing: "1px",
            marginBottom: "25px",
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "scale(0.96)")
          }
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✉️ Buka Undangan
        </button>

        <p
          style={{
            fontSize: "0.68rem",
            opacity: 0.5,
            fontStyle: "italic",
            margin: 0,
            letterSpacing: "0.2px",
          }}
        >
          Mohon maaf apabila ada kesalahan penulisan nama/gelar
        </p>
      </div>
    </div>
  );
}

export default function WeddingCover(props: WeddingCoverProps) {
  return (
    <Suspense fallback={null}>
      <CoverContent {...props} />
    </Suspense>
  );
}