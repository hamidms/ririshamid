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
        justifyContent: "flex-end", // Geser ke sisi kanan
        alignItems: "flex-start",   // Geser ke agak atas
        boxSizing: "border-box",
        padding: "48px 24px 24px 24px",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/gallery/couple/not-found.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />

      {/* KONTEN PUISI & TOMBOL */}
      <div
        style={{
          maxWidth: "340px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end", // Elemen di dalamnya rata kanan
          textAlign: "right",     // Teks puisi rata kanan
          color: "#2c3e50",       // Warna teks gelap agar terbaca di area langit terang
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "0.55rem",
            lineHeight: "1.5",
            fontStyle: "italic",
            marginBottom: "24px",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
          }}
        >
          <p style={{ margin: "60px 0 12px 0" }}>
            aku menyukai langit<br />
            teriknya terasa hangat<br />
            badainya terdengar merdu<br />
            awan mendungnya menenangkan
          </p>

          <p style={{ margin: "0 0 12px 0" }}>
            aku menyukai bumi<br />
            hutannya melindungi<br />
            pantai dan lautnya megah<br />
            merawat segala yang tumbuh
          </p>

          <p style={{ margin: "0 0 12px 0" }}>
            aku menyukai keindahan<br />
            seperti sekilas sinar matahari<br />
            bias hujan yang menyusun pelangi<br />
            berlian langka yang keras namun cantik
          </p>

          <p style={{ margin: 0 }}>
            pada dunia yang penuh dengan puisi<br />
            kutulis syair pujian tentangmu<br />
            dalam cerita dan mimpi<br />
            <strong>aku menyukaimu</strong>
          </p>
        </div>

      </div>
    </div>
  );
}