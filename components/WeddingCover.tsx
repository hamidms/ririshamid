"use client";

import React, { Suspense } from "react";

interface WeddingCoverProps {
  onOpen: () => void;
  guestName?: string | null;
}

function CoverContent({ onOpen, guestName: guestNameProp }: WeddingCoverProps) {
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
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* BACKGROUND IMAGE DENGAN EFEK BLUR & DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.75)), url('/gallery/couple/cover.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)", // Menambahkan efek blur pada background
          transform: "scale(1.08)", // Scale sedikit agar tepi layar tertutup rapat dari vignetting blur
          zIndex: 0,
        }}
      />

      {/* IMPORT GOOGLE FONT DANCING SCRIPT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
      `}</style>

      {/* SPACE ATAS UNTUK BALANCE LAYOUT */}
      <div style={{ height: "40px", zIndex: 2 }} />

      {/* AREA KONTEN UTAMA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 24px",
          zIndex: 2,
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.9)",
            marginBottom: "16px",
            textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          THE WEDDING OF
        </p>

        {/* Nama Pengantin (Dancing Script Warna Putih) */}
        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "4.2rem",
            fontWeight: "600",
            lineHeight: "1.2",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 3px 12px rgba(0,0,0,0.7)",
          }}
        >
          Riris
          <br />
          <span style={{ fontSize: "2.5rem", fontStyle: "normal" }}>&amp;</span>
          <br />
          Hamid
        </h1>

        {/* Tanggal Pernikahan */}
        <p
          style={{
            fontSize: "0.9rem",
            letterSpacing: "3px",
            color: "rgba(255, 255, 255, 0.95)",
            marginTop: "16px",
            marginBottom: "40px",
            textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          }}
        >
          18.10.2026
        </p>

        {/* Informasi Tamu */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(255, 255, 255, 0.9)",
              margin: 0,
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>

          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "6px 0",
              letterSpacing: "1px",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
          >
            {guestName}
          </h2>

          <p
            style={{
              fontSize: "0.7rem",
              color: "rgba(255, 255, 255, 0.8)",
              margin: 0,
              maxWidth: "280px",
              lineHeight: "1.4",
              textShadow: "0 1px 3px rgba(0,0,0,0.6)",
            }}
          >
            Mohon maaf apabila terdapat kesalahan dalam penulisan nama &amp; gelar
          </p>
        </div>
      </div>

      {/* TOMBOL BUKA UNDANGAN (BOTTOM) */}
      <div
        style={{
          paddingBottom: "100px",
          zIndex: 2,
        }}
      >
        <button
          onClick={onOpen}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.7)",
            padding: "12px 36px",
            fontSize: "0.78rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            borderRadius: "30px",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            transition: "all 0.2s ease",
            fontFamily: "sans-serif",
            fontWeight: "500",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          BUKA UNDANGAN
        </button>
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