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
        backgroundColor: "#f8f6f0",
        color: "#4a3e35",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* BACKGROUND ORNAMEN FLORAL (SVG) */}
      {/* Ornamen Kanan Atas */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-30px",
          width: "220px",
          height: "220px",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="140" cy="60" r="45" fill="#E8B4B8" opacity="0.6" />
          <circle cx="100" cy="40" r="35" fill="#F4D1D2" opacity="0.7" />
          <path d="M120 80 Q160 30 180 90" stroke="#C5A059" strokeWidth="1.5" fill="none" />
          <path d="M90 60 Q130 10 150 70" stroke="#C5A059" strokeWidth="1" fill="none" />
          <circle cx="150" cy="80" r="8" fill="#D8959B" />
        </svg>
      </div>

      {/* Ornamen Kiri Bawah */}
      <div
        style={{
          position: "absolute",
          bottom: "-20px",
          left: "-30px",
          width: "240px",
          height: "240px",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="140" r="50" fill="#E8B4B8" opacity="0.6" />
          <circle cx="40" cy="100" r="40" fill="#F4D1D2" opacity="0.7" />
          <path d="M80 120 Q30 160 90 180" stroke="#C5A059" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="120" r="10" fill="#D8959B" />
        </svg>
      </div>

      {/* SPACE ATAS UNTUK BALANCE LAYOUT */}
      <div style={{ height: "40px" }} />

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
            color: "#8c735c",
            marginBottom: "16px",
          }}
        >
          THE WEDDING OF
        </p>

        {/* Nama Pengantin */}
        <h1
          style={{
            fontSize: "3.2rem",
            fontWeight: "normal",
            lineHeight: "1.1",
            color: "#6b4f35",
            margin: 0,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          RIRIS
          <br />
          <span style={{ fontSize: "2rem", fontStyle: "italic", textTransform: "none" }}>&amp;</span>
          <br />
          HAMID
        </h1>

        {/* Tanggal Pernikahan */}
        <p
          style={{
            fontSize: "0.9rem",
            letterSpacing: "3px",
            color: "#8c735c",
            marginTop: "16px",
            marginBottom: "40px",
          }}
        >
          18.10.2026
        </p>

        {/* Informasi Tamu */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#7a6655",
              margin: 0,
            }}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </p>

          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#543d2b",
              margin: "6px 0",
              letterSpacing: "1px",
              // textTransform: "uppercase",
            }}
          >
            {guestName}
          </h2>

          <p
            style={{
              fontSize: "0.7rem",
              color: "#968372",
              margin: 0,
              maxWidth: "280px",
              lineHeight: "1.4",
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
            backgroundColor: "#ffffff",
            color: "#543d2b",
            border: "1px solid #b8a695",
            padding: "12px 36px",
            fontSize: "0.78rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            borderRadius: "30px",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(107, 79, 53, 0.08)",
            transition: "transform 0.2s ease",
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