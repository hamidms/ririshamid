"use client";

import React, { useState, useEffect } from "react";

interface BookModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookModalBox({ isOpen, onClose }: BookModalBoxProps) {
  // State Animasi Fade & Mounting
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Menangani animasi Fade-in & Fade-out saat isOpen berubah
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

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
    <>
      {/* OVERLAY / BACKDROP DENGAN FADE IN/OUT */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 9998,
          opacity: animate ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* TOMBOL SILANG FIXED DENGAN FADE IN/OUT */}
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
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
          opacity: animate ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        ✕
      </button>

      {/* MODAL UTAMA DENGAN FADE IN/OUT & SCALE ANIMATION */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "5%",
          width: "90vw",
          height: "88vh",
          backgroundColor: "#fbf9f5",
          borderRadius: "24px",
          padding: "25px 20px 20px 20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          zIndex: 10000,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to right, rgba(74, 59, 50, 0.04) 1px, transparent 1px)",
          backgroundSize: "20px 100%",
          overflow: "hidden",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* HEADER JUDUL */}
        <div style={{ paddingRight: "35px", marginBottom: "10px" }}>
          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2.6rem",
              fontStyle: "italic",
              fontWeight: "normal",
              color: "#4a3b32",
              margin: 0,
            }}
          >
            Our Story
          </h1>

          {/* Garis Gelombang Dekoratif */}
          <div
            style={{
              width: "100%",
              height: "10px",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 12' width='100%25' height='12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 C150,12 150,0 300,6 C450,12 450,0 600,6 C750,12 750,0 900,6 C1050,12 1050,0 1200,6' fill='none' stroke='%234a3b32' stroke-width='2'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat-x",
              margin: "8px 0",
            }}
          />

          <p
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#6e5d53",
              fontSize: "0.85rem",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            Outside of time gluing to the screen, I have been filling weekends with slower, more tactile routines.
          </p>
        </div>

        {/* CONTAINER HORIZONTAL SCROLL */}
        <div
          style={{
            display: "flex",
            gap: "25px",
            overflowX: "auto",
            overflowY: "hidden",
            padding: "20px 10px 30px 5px",
            flex: 1,
            alignItems: "center",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              style={{
                flex: "0 0 240px",
                backgroundColor: "#ffffff",
                padding: "12px 12px 18px 12px",
                borderRadius: "8px",
                transform: `rotate(${item.rotate})`,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                scrollSnapAlign: "center",
                border: "1px solid rgba(74, 59, 50, 0.08)",
              }}
            >
              {/* AKSEN ISOLASI/SELOTIP DI ATAS KARTU */}
              <div
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "15px",
                  width: "45px",
                  height: "16px",
                  backgroundColor: "rgba(222, 210, 189, 0.6)",
                  transform: "rotate(-15deg)",
                  borderLeft: "1px dashed rgba(255,255,255,0.4)",
                  borderRight: "1px dashed rgba(255,255,255,0.4)",
                }}
              />

              {/* FOTO POLAROID */}
              <div
                style={{
                  width: "100%",
                  height: "160px",
                  backgroundColor: "#ecebe6",
                  overflow: "hidden",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              {/* BAGIAN TEKS KETERANGAN FOTO */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h3
                  style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1.1rem",
                    color: "#3e3129",
                    margin: 0,
                    fontWeight: "normal",
                  }}
                >
                  {item.title}
                </h3>
                <div style={{ width: "100%", height: "1px", backgroundColor: "#e6dfd5", margin: "2px 0" }} />
                <p
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: "0.75rem",
                    color: "#7a695e",
                    margin: 0,
                    lineHeight: "1.3",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* INDIKATOR SWIPE SAMAR DI BAGIAN BAWAH */}
        <div
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "#a39589",
            fontStyle: "italic",
            letterSpacing: "0.5px",
          }}
        >
          Swipe left/right to view gallery ➔
        </div>
      </div>
    </>
  );
}