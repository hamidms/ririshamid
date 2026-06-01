"use client";

import React, { useState, useRef, useEffect } from "react";

interface AudioModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AudioModalBox({ isOpen, onClose }: AudioModalBoxProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isOpen && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah klik menembus ke elemen latar belakang
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log("Playback blocked:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <audio 
        ref={audioRef}
        src="/audio/taruh.mp3" 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* TOMBOL SILANG FIXED */}
      <button 
        onClick={onClose} 
        style={{
          position: "fixed",
          top: "calc(5% + 15px)",
          right: "calc(5% + 15px)",
          width: "35px",
          height: "35px",
          backgroundColor: "#d63031",
          color: "white",
          border: "none",
          borderRadius: "50%",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10001,
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
        }}
      >
        ✕
      </button>

      {/* WINDOW MODAL UTAMA */}
      <div style={{
        position: "fixed", 
        top: "5%",
        left: "5%",
        width: "90vw",
        height: "88vh", 
        backgroundColor: "#f4f1ea", 
        borderRadius: "24px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        zIndex: 10000,
        boxSizing: "border-box",
        padding: "60px 20px 40px 20px",
        display: "block", // Menggunakan block biasa agar elemen di dalam mengalir alami ke bawah
        overflowX: "hidden",
        overflowY: "auto",
      }}>

        {/* KONTEN TEXT: SURAT AR-RUM AYAT 21 */}
        <div style={{
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          padding: "24px 20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
          marginBottom: "30px",
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box"
        }}>
          <h3 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.05rem",
            fontWeight: "bold",
            color: "#2c3e50",
            margin: "0 0 16px 0"
          }}>
            Ar-Rum Ayat 21
          </h3>

          <p style={{
            fontFamily: "'Amiri', 'Traditional Arabic', serif",
            fontSize: "1.4rem",
            lineHeight: "2.2",
            color: "#2c3e50",
            direction: "rtl",
            margin: "0 0 16px 0"
          }}>
            وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
          </p>

          <div style={{ width: "35px", height: "1px", backgroundColor: "#e2e8f0", margin: "12px auto" }} />

          <p style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.8rem",
            color: "#57606f",
            lineHeight: "1.5",
            fontStyle: "italic",
            margin: 0
          }}>
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
        </div>

        {/* WIDGET AUDIO PLAYER (TOTAL FIX DENGAN VALUE ABSOLUT) */}
        <div style={{
          width: "100%",
          maxWidth: "420px",
          // Menggunakan minHeight dan height tetap yang dipaksa agar terhindar dari himpitan layout luar
          height: "260px",
          minHeight: "260px", 
          borderRadius: "24px",
          boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
          position: "relative",
          marginLeft: "auto",
          marginRight: "auto",
          overflow: "hidden",
          backgroundImage: "linear-gradient(to right, rgba(15,20,30,0.85), rgba(15,20,30,0.45)), url('https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F9b2e7b465162c2aa5c670844c040f15c.1000x1000x1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "table", // Menggunakan format display table/block alternatif agar terhindar dari bug flexbox di beberapa browser
          padding: "20px 18px",
          boxSizing: "border-box",
          color: "#ffffff"
        }}>
          
          {/* BARIS ATAS: LOGO SPOTIFY & BADGE HEADPHONE */}
          <div style={{ display: "block", width: "100%", height: "30px", clear: "both" }}>
            <div style={{ float: "left", color: "#1DB954", marginTop: "2px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.745-.47-.077-.337.135-.668.47-.745 3.856-.88 7.15-.502 9.822 1.132.296.18.388.565.206.858zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.847-.107-.972-.52-.125-.413.108-.847.52-.972 3.674-1.114 8.243-.57 11.347 1.34.367.226.487.707.26 1.074zm.104-2.827C14.36 8.526 8.49 8.333 5.093 9.365c-.525.16-1.08-.142-1.24-.667-.158-.526.143-1.08.667-1.24 3.892-1.18 10.375-.956 14.444 1.46.475.282.63.897.347 1.37-.282.475-.897.63-1.37.348z"/>
              </svg>
            </div>
            
            <div style={{
              float: "right",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#1e272e",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "0.65rem",
              fontWeight: "600"
            }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
              </svg>
              <span>Wired headp...</span>
            </div>
          </div>

          {/* BARIS TENGAH: DETAIL LAGU & CONTROLLER BUTTON */}
          <div style={{ display: "block", width: "100%", height: "60px", marginTop: "40px", clear: "both" }}>
            <div style={{ float: "left", width: "70%" }}>
              <h4 style={{ fontSize: "1.3rem", fontWeight: "bold", margin: "0 0 4px 0", textShadow: "1px 1px 4px rgba(0,0,0,0.8)", color: "#ffffff" }}>
                Taruh
              </h4>
              <p style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.9)", margin: 0, textShadow: "1px 1px 3px rgba(0,0,0,0.8)" }}>
                Nadin Amizah
              </p>
            </div>

            {/* Tombol Putih Play/Pause */}
            <button 
              onClick={togglePlay}
              style={{
                float: "right",
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "#ffffff",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#1e272e",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                outline: "none"
              }}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "3px" }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>

          {/* BARIS BAWAH: RUNNING TRACKER LINE & KONTROL */}
          <div style={{ display: "block", width: "100%", marginTop: "35px", clear: "both" }}>
            
            {/* Wave & Progress Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", marginBottom: "15px" }}>
              <svg width="14" height="8" viewBox="0 0 24 12" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3">
                <path d="M2 6c3-4 5-4 8 0s5 4 8 0 4-2 4-2" />
              </svg>
              <div style={{ flex: 1, height: "4px", backgroundColor: "rgba(255,255,255,0.3)", borderRadius: "2px" }}>
                <div style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#ffffff",
                  borderRadius: "2px",
                  transition: "width 0.1s linear"
                }} />
              </div>
            </div>

            {/* Ikon Baris Paling Bawah */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", opacity: 0.95 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>

              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 17a3 3 0 0 1 6 0v-5a6 6 0 1 1 6 6h-1"></path>
                  <circle cx="12" cy="7" r="1"></circle>
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14M7 23 3 19l4-4"></path>
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}