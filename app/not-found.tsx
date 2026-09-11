import React from "react";
import Link from "next/link";

export default function NotFound() {
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
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        padding: "24px",
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
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85)), url('/gallery/couple/couple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          transform: "scale(1.05)",
          zIndex: -1,
        }}
      />

      {/* KONTEN UTAMA 404 */}
      <div
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "0.9rem",
            letterSpacing: "4px",
            textTransform: "uppercase",
            opacity: 0.8,
            margin: 0,
            textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          The Wedding of Riris & Hamid
        </p>

        <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "6rem",
            fontWeight: "normal",
            margin: 0,
            lineHeight: 1,
            color: "#f1c40f",
            textShadow: "2px 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.5rem",
            fontWeight: "normal",
            fontStyle: "italic",
            margin: 0,
            textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
          }}
        >
          Halaman Tidak Ditemukan
        </h2>

        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: "1.6",
            opacity: 0.85,
            margin: "8px 0 24px 0",
            fontFamily: "sans-serif",
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>

        {/* TOMBOL KEMBALI KE UNDANGAN */}
        <Link
          href="/"
          style={{
            display: "inline-block",
            backgroundColor: "#ffffff",
            color: "#1e272e",
            textDecoration: "none",
            padding: "12px 32px",
            fontSize: "0.9rem",
            fontWeight: "600",
            borderRadius: "30px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
            letterSpacing: "1px",
            fontFamily: "sans-serif",
          }}
        >
          🏠 Kembali ke Undangan
        </Link>
      </div>
    </div>
  );
}