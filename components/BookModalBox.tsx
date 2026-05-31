"use client";

import React from "react";

interface BookModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookModalBox({ isOpen, onClose }: BookModalBoxProps) {
  if (!isOpen) return null;

  const galleryItems = [
    {
      src: "/gallery/book/photo1.jpg",
      title: "Baking!",
      desc: "Going back home means getting access to a better oven, and it means a lot of baking. I tried so many things from normal bread to sourdough.",
      rotate: "-2deg",
    },
    {
      src: "/gallery/book/photo2.jpg",
      title: "Piano",
      desc: "I lost touch with the piano since I went away. Slowly getting back in the groove of it, but my hands are definitely not as flexible.",
      rotate: "1.5deg",
    },
    {
      src: "/gallery/book/photo3.jpg",
      title: "Exercise",
      desc: "Not a hobby but it's a health-conscious effort of mine to combat my crackling back. At least I feel pretty great during work hours.",
      rotate: "-1deg",
    },
    {
      src: "/gallery/book/photo4.jpg",
      title: "Reading Time",
      desc: "Catching up with some technical documentation and fantasy novels on quiet nights to refresh my brain.",
      rotate: "2deg",
    },
    {
      src: "/gallery/book/photo5.jpg",
      title: "Sketching",
      desc: "Doodling out some fresh interface layout ideas and 3D composition drafts before jumping straight into code.",
      rotate: "-1.5deg",
    },
  ];

  return (
    <div style={{
      position: "fixed", // Menggunakan fixed agar benar-benar mengunci layar HP
      top: "5%",
      left: "5%",
      width: "90vw",
      height: "88vh", 
      backgroundColor: "#fbf9f5", // Warna creme hangat
      borderRadius: "24px",
      padding: "25px 20px 20px 20px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
      zIndex: 999,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      // Garis latar belakang bergaris halus vertikal khas buku tulis
      backgroundImage: "linear-gradient(to right, rgba(74, 59, 50, 0.04) 1px, transparent 1px)",
      backgroundSize: "20px 100%",
      overflow: "hidden"
    }}>
      
      {/* TOMBOL SILANG BULAT MERAH KHAS MOBILE */}
      <button 
        onClick={onClose} 
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "30px",
          height: "30px",
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

      {/* HEADER JUDUL (Disesuaikan untuk ukuran teks HP) */}
      <div style={{ paddingRight: "35px", marginBottom: "10px" }}>
        <h1 style={{ 
          fontFamily: "'Georgia', serif", 
          fontSize: "2.6rem", // Diperkecil agar muat satu baris di HP
          fontStyle: "italic", 
          fontWeight: "normal", 
          color: "#4a3b32", 
          margin: 0 
        }}>
          Our Story
        </h1>
        
        {/* Garis Gelombang Dekoratif */}
        <div style={{ 
          width: "100%", 
          height: "10px", 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 12' width='100%25' height='12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 C150,12 150,0 300,6 C450,12 450,0 600,6 C750,12 750,0 900,6 C1050,12 1050,0 1200,6' fill='none' stroke='%234a3b32' stroke-width='2'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x", 
          margin: "8px 0"
        }} />
        
        <p style={{ 
          fontFamily: "Arial, sans-serif", 
          color: "#6e5d53", 
          fontSize: "0.85rem", 
          lineHeight: "1.4", 
          margin: 0 
        }}>
          Outside of time gluing to the screen, I have been filling weekends with slower, more tactile routines.
        </p>
      </div>

      {/* CONTAINER HORIZONTAL SCROLL (Responsif Layar Sentuh HP) */}
      <div style={{
        display: "flex",
        gap: "25px", 
        overflowX: "auto", 
        overflowY: "hidden",
        padding: "20px 10px 30px 5px", 
        flex: 1, 
        alignItems: "center",
        // Fitur native mobile scroll biar mulus saat di-swipe jari
        scrollSnapType: "x mandatory", 
        WebkitOverflowScrolling: "touch",
        // Menyembunyikan scrollbar bawaan browser pada beberapa perangkat HP agar bersih
        scrollbarWidth: "none"
      }}>
        {galleryItems.map((item, idx) => (
          <div 
            key={idx}
            style={{
              flex: "0 0 240px", // Lebar kartu dioptimalkan untuk lebar layar HP umumnya (lebar ~240px)
              backgroundColor: "#ffffff", 
              padding: "12px 12px 18px 12px",
              borderRadius: "8px", 
              transform: `rotate(${item.rotate})`,
              boxShadow: "0 8px 20px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)",
              position: "relative", 
              display: "flex", 
              flexDirection: "column", 
              gap: "10px",
              scrollSnapAlign: "center", // Kartu akan otomatis berhenti di tengah saat di-swipe
              border: "1px solid rgba(74, 59, 50, 0.08)"
            }}
          >
            {/* AKSEN ISOLASI/SELOTIP DI ATAS KARTU */}
            <div style={{
              position: "absolute", 
              top: "-12px", 
              left: "15px", 
              width: "45px", 
              height: "16px",
              backgroundColor: "rgba(222, 210, 189, 0.6)", 
              transform: "rotate(-15deg)",
              borderLeft: "1px dashed rgba(255,255,255,0.4)", 
              borderRight: "1px dashed rgba(255,255,255,0.4)"
            }} />

            {/* FOTO POLAROID */}
            <div style={{ 
              width: "100%", 
              height: "160px", // Tinggi disesuaikan dengan proporsi HP
              backgroundColor: "#ecebe6", 
              overflow: "hidden",
              borderRadius: "4px"
            }}>
              <img 
                src={item.src} 
                alt={item.title} 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  // Fallback visual jika gambar lokal belum ter-load
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* BAGIAN TEKS KETERANGAN FOTO */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <h3 style={{ 
                fontFamily: "'Georgia', serif", 
                fontSize: "1.1rem", 
                color: "#3e3129", 
                margin: 0, 
                fontWeight: "normal" 
              }}>
                {item.title}
              </h3>
              <div style={{ width: "100%", height: "1px", backgroundColor: "#e6dfd5", margin: "2px 0" }} />
              <p style={{ 
                fontFamily: "Arial, sans-serif", 
                fontSize: "0.75rem", 
                color: "#7a695e", 
                margin: 0, 
                lineHeight: "1.3" 
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* INDIKATOR SWIPE SAMAR DI BAGIAN BAWAH */}
      <div style={{ 
        textAlign: "center", 
        fontSize: "0.7rem", 
        color: "#a39589", 
        fontStyle: "italic",
        letterSpacing: "0.5px"
      }}>
        Swipe left/right to view gallery ➔
      </div>

    </div>
  );
}