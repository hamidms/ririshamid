"use client";

import React from "react";

interface CalendarModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarModalBox({ isOpen, onClose }: CalendarModalBoxProps) {
  if (!isOpen) return null;

  // Data kalender yang disesuaikan ke Bahasa Indonesia
  const calendarData = [
    { day: 1, note: "" },
    { day: 2, note: "tetapkan target untuk blog", highlighted: true, isFlower: true },
    { day: 3, note: "" },
    { day: 4, note: "mulai tantangan", isDiamond: true },
    { day: 5, note: "" },
    { day: 6, note: "" },
    { day: 7, note: "podcast tentang bio profil", isCloud: true },
    { day: 8, note: "" },
    { day: 9, note: "" },
    { day: 10, note: "" },
    { day: 11, note: "" },
    { day: 12, note: "siaran dengan tamu rahasia", isDashed: true },
    { day: 13, note: "" },
    { day: 14, note: "" },
    { day: 15, note: "" },
    { day: 16, note: "" },
    { day: 17, note: "" },
    { day: 18, note: "pengemasan & pembuatan sorotan", isCircle: true },
    { day: 19, note: "" },
    { day: 20, note: "" },
    { day: 21, note: "dari mana mencari ide konten", isBigFlower: true },
    { day: 22, note: "" },
    { day: 23, note: "" },
    { day: 24, note: "" },
    { day: 25, note: "cara agar blog tidak telantar", isDashed: true },
    { day: 26, note: "" },
    { day: 27, note: "" },
    { day: 28, note: "" },
    { day: 29, note: "akhir tantangan", isCloud: true },
    { day: 30, note: "" },
    { day: 31, note: "" },
  ];

  return (
    <div style={{
      position: "fixed",
      top: "5%",
      left: "5%",
      width: "90vw",
      height: "88vh",
      backgroundColor: "#fbf9f5", // Latar belakang creme hangat sesuai referensi
      borderRadius: "24px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
      zIndex: 999,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      
      {/* 1. HEADER AREA (FIXED/STICKY - TIDAK AKAN IKUT KESCROLL) */}
      <div style={{
        padding: "25px 20px 15px 20px",
        position: "relative",
        borderBottom: "1px dashed rgba(0, 0, 0, 0.05)"
      }}>
        {/* TOMBOL SILANG BULAT MERAH (Tetap mengunci di pojok kanan atas) */}
        <button 
          onClick={onClose} 
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "32px",
            height: "32px",
            backgroundColor: "#d63031",
            color: "white",
            border: "none",
            borderRadius: "50%",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
          }}
        >
          ✕
        </button>

        {/* JUDAL UTAMA */}
        <h2 style={{ 
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', sans-serif", 
          fontSize: "2.3rem", 
          color: "#1e56e3", // Warna biru ikonik sesuai gambar
          margin: 0,
          lineHeight: "1.1"
        }}>
          Catat<br />Tanggalnya!
        </h2>

        {/* CATATAN KECIL DI SEBELAH KANAN ATAS */}
        <p style={{
          position: "absolute",
          top: "65px",
          right: "20px",
          width: "120px",
          fontFamily: "sans-serif",
          fontSize: "0.65rem",
          color: "#1e56e3",
          fontStyle: "italic",
          textAlign: "right",
          margin: 0,
          lineHeight: "1.2"
        }}>
          * materi dapat disesuaikan dan ditambahkan jika diperlukan
        </p>
      </div>

      {/* 2. CONTENT AREA (BISA DI-SCROLL KE BAWAH SECARA INDEPENDEN) */}
      <div style={{
        flex: 1,
        overflowY: "auto", // Scroll vertikal hanya aktif di area grid ini
        padding: "15px 15px 25px 15px",
        WebkitOverflowScrolling: "touch"
      }}>
        
        {/* GRID LAYOUT KALENDER (5 Kolom agar pas di layar HP portrait) */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1px",
          backgroundColor: "#1e56e3", // Garis pembatas grid menggunakan background utama
          border: "2px solid #1e56e3",
          borderRadius: "12px",
          overflow: "hidden"
        }}>
          {calendarData.map((item, idx) => {
            // Logika kustom penataan style dekorasi sel
            let cellStyle: React.CSSProperties = {
              backgroundColor: "#fbf9f5",
              minHeight: "75px",
              padding: "6px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box"
            };

            if (item.isDashed) {
              cellStyle = { ...cellStyle, border: "2px dashed #1e56e3", backgroundColor: "#ffffff" };
            }

            return (
              <div key={idx} style={cellStyle}>
                {/* ANGKA TANGGAL */}
                <span style={{
                  fontFamily: "'Comic Sans MS', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "#1e56e3",
                  zIndex: 2
                }}>
                  {item.day}
                </span>

                {/* TEKS CATATAN DI DALAM SEL KOTAK */}
                {item.note && (
                  <p style={{
                    margin: 0,
                    fontSize: "0.55rem",
                    fontFamily: "sans-serif",
                    color: "#1e56e3",
                    fontWeight: "500",
                    lineHeight: "1.1",
                    wordBreak: "break-word",
                    zIndex: 2
                  }}>
                    {item.note}
                  </p>
                )}

                {/* DEKORASI BENTUK (IKON LOGIKA VISUAL) */}
                {item.isFlower && (
                  <div style={{
                    position: "absolute", top: "15px", left: "5px", width: "24px", height: "24px",
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff8da1'/%3E\")", // Bunga merah muda samar
                    opacity: 0.6, zIndex: 1
                  }} />
                )}
                {item.isDiamond && (
                  <span style={{ position: "absolute", top: "6px", right: "6px", color: "#4ba3e3", fontSize: "0.8rem" }}>◆</span>
                )}
                {item.isCircle && (
                  <div style={{
                    position: "absolute", inset: "4px", border: "1px solid #1e56e3", borderRadius: "50%", pointerEvents: "none"
                  }} />
                )}
              </div>
            );
          })}
        </div>

        {/* DEKORASI FOOTER BAHASA INDONESIA DI BAWAH GRID */}
        <div style={{ marginTop: "25px", textAlign: "center", padding: "0 10px" }}>
          <h2 style={{
            fontFamily: "'Comic Sans MS', sans-serif",
            fontSize: "1.8rem",
            color: "#1e56e3",
            margin: "0 0 5px 0",
            transform: "rotate(-2deg)"
          }}>
            Setitik Udara Segar
          </h2>
        </div>

      </div>
    </div>
  );
}