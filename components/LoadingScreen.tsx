"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  // Efek simulasi loading bar berjalan mulus menuju 100% dalam 2 detik
  useEffect(() => {
    const startTime = Date.now();
    const duration = 2000; // 2 detik

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
      }
    }, 16); // ~60fps smooth update

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#f4f1ea", // Warna krem estetik sesuai gambar tutorialmu
      zIndex: 99998, // Di bawah WeddingCover, tapi di atas konten utama 3D
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Georgia', serif",
      color: "#4a3728",
      boxSizing: "border-box",
      padding: "24px"
    }}>
      
      {/* HEADER TUTORIAL */}
      <h3 style={{
        fontSize: "1.1rem",
        fontWeight: "normal",
        letterSpacing: "2px",
        margin: "0 0 40px 0",
        textTransform: "lowercase",
        fontStyle: "italic"
      }}>
        mini tutorial
      </h3>

      {/* DAFTAR TUTORIAL (VERTIKAL: ATAS KE BAWAH) */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "35px",
        width: "100%",
        maxWidth: "280px",
        marginBottom: "50px"
      }}>
        
        {/* ITEM 1 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🫳</div>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "0.82rem", margin: 0, opacity: 0.85, lineHeight: "1.4" }}>
            drag around to move camera.
          </p>
        </div>

        {/* ITEM 2 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>👆</div>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "0.82rem", margin: 0, opacity: 0.85, lineHeight: "1.4" }}>
            tap to interact with objects.
          </p>
        </div>

        {/* ITEM 3 */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>🪲</div>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "0.82rem", margin: 0, opacity: 0.85, lineHeight: "1.4" }}>
            if something doesn't work, let me know!
          </p>
        </div>

      </div>

      {/* LOADING BAR SECTION */}
      <div style={{ width: "100%", maxWidth: "320px", textAlign: "right" }}>
        
        {/* Progress Container Track */}
        <div style={{
          width: "100%",
          height: "12px",
          backgroundColor: "rgba(74, 55, 40, 0.15)",
          borderRadius: "6px",
          overflow: "hidden",
          position: "relative",
          marginBottom: "8px"
        }}>
          {/* Progress Fill dengan Motif Garis Belang (Stripes) */}
          <div style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: "6px",
            backgroundImage: "linear-gradient(45deg, #4a3728 25%, #634a36 25%, #634a36 50%, #4a3728 50%, #4a3728 75%, #634a36 75%, #634a36 100%)",
            backgroundSize: "20px 20px",
            transition: "width 0.1s linear"
          }} />
        </div>

        {/* Loading Text */}
        <span style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "0.75rem",
          fontStyle: "italic",
          opacity: 0.7,
          letterSpacing: "0.5px"
        }}>
          now loading...
        </span>
      </div>

    </div>
  );
}