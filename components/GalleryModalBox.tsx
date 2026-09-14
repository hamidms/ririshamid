"use client";

import React, { useState, useEffect, useCallback } from "react";

interface GalleryModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModalBox({ isOpen, onClose }: GalleryModalBoxProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  // State untuk melacak indeks foto yang sedang diperbesar (null jika sedang di mode galeri)
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setActivePhotoIndex(null); // Reset preview saat modal ditutup
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Daftar 15 Foto
  const galleryPhotos = [
    { id: 1, src: "/gallery/photo/image1.jpg", alt: "Photo 1" },
    { id: 2, src: "/gallery/photo/image2.jpg", alt: "Photo 2" },
    { id: 3, src: "/gallery/photo/image3.jpg", alt: "Photo 3" },
    { id: 4, src: "/gallery/photo/image4.jpg", alt: "Photo 4" },
    { id: 5, src: "/gallery/photo/image5.jpg", alt: "Photo 5" },
    { id: 6, src: "/gallery/photo/image6.jpg", alt: "Photo 6" },
    { id: 7, src: "/gallery/photo/image7.jpg", alt: "Photo 7" },
    { id: 8, src: "/gallery/photo/image8.jpg", alt: "Photo 8" },
    { id: 9, src: "/gallery/photo/image9.jpg", alt: "Photo 9" },
    { id: 10, src: "/gallery/photo/image10.jpg", alt: "Photo 10" },
    { id: 11, src: "/gallery/photo/image11.jpg", alt: "Photo 11" },
    { id: 12, src: "/gallery/photo/image12.jpg", alt: "Photo 12" },
    { id: 13, src: "/gallery/photo/image13.jpg", alt: "Photo 13" },
    { id: 14, src: "/gallery/photo/image14.jpg", alt: "Photo 14" },
    { id: 15, src: "/gallery/photo/image15.jpg", alt: "Photo 15" },
  ];

  // Fungsi Navigasi Foto
  const handlePrev = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev === 0 ? galleryPhotos.length - 1 : (prev as number) - 1
      );
    }
  }, [activePhotoIndex, galleryPhotos.length]);

  const handleNext = useCallback(() => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) =>
        prev === galleryPhotos.length - 1 ? 0 : (prev as number) + 1
      );
    }
  }, [activePhotoIndex, galleryPhotos.length]);

  // Navigasi via Keyboard (Panah Kiri, Panah Kanan, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setActivePhotoIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev]);

  if (!shouldRender) return null;

  // Komponen Foto yang Bisa Diklik
  const RawPhoto = ({
    photoIndex,
    width,
    height,
  }: {
    photoIndex: number;
    width: number;
    height: number;
  }) => {
    const photo = galleryPhotos[photoIndex] || galleryPhotos[0];

    return (
      <div
        onClick={() => setActivePhotoIndex(photoIndex)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundColor: "#e2ded4",
          overflow: "hidden",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          flexShrink: 0,
          cursor: "pointer",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 5px 12px rgba(0,0,0,0.25)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      </div>
    );
  };

  return (
    <>
      {/* OVERLAY / BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: 9998,
          opacity: animate ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* TOMBOL SILANG UTAMA (Tutup Modal) */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: "calc(5% + 15px)",
          right: "calc(5% + 15px)",
          width: "35px",
          height: "35px",
          backgroundColor: "#cb808b",
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

      {/* MODAL CONTAINER */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "5%",
          width: "90vw",
          height: "88vh",
          backgroundColor: "#f3efe6",
          borderRadius: "24px",
          padding: "20px 15px 15px 15px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          zIndex: 10000,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to right, rgba(22, 42, 64, 0.03) 1px, transparent 1px)",
          backgroundSize: "20px 100%",
          overflow: "hidden",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* HEADER JUDUL */}
        <div style={{ paddingRight: "35px", marginBottom: "4px", flexShrink: 0 }}>
          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2rem",
              fontStyle: "italic",
              fontWeight: "normal",
              color: "#162a40",
              margin: 0,
            }}
          >
            Our Gallery
          </h1>

          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 12' width='100%25' height='12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 C150,12 150,0 300,6 C450,12 450,0 600,6 C750,12 750,0 900,6 C1050,12 1050,0 1200,6' fill='none' stroke='%23162a40' stroke-width='2'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat-x",
              margin: "4px 0 0 0",
            }}
          />
        </div>

        {/* CONTAINER WALL GALLERY */}
        <div
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
              transform: "scale(min(calc((90vw - 30px) / 480), calc((88vh - 100px) / 520)))",
              transformOrigin: "center center",
            }}
          >
            {/* BARIS 1 (ATAS) */}
            <RawPhoto photoIndex={0} width={75} height={100} />

            {/* BARIS 2 */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <RawPhoto photoIndex={1} width={65} height={75} />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <RawPhoto photoIndex={2} width={60} height={55} />
                  <RawPhoto photoIndex={3} width={60} height={55} />
                </div>
              </div>

              <RawPhoto photoIndex={4} width={85} height={115} />

              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <RawPhoto photoIndex={5} width={60} height={55} />
                  <RawPhoto photoIndex={6} width={60} height={55} />
                </div>
                <RawPhoto photoIndex={7} width={65} height={75} />
              </div>
            </div>

            {/* BARIS 3 (TENGAH) */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "2px 0" }}>
              <RawPhoto photoIndex={8} width={70} height={70} />

              <div
                style={{
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  fontStyle: "italic",
                  fontSize: "2.5rem",
                  color: "#5c4938",
                  letterSpacing: "1px",
                  userSelect: "none",
                  textAlign: "center",
                  width: "160px",
                }}
              >
                familia
              </div>

              <RawPhoto photoIndex={9} width={70} height={70} />
            </div>

            {/* BARIS 4 */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <RawPhoto photoIndex={10} width={65} height={75} />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <RawPhoto photoIndex={11} width={60} height={55} />
                  <RawPhoto photoIndex={12} width={60} height={65} />
                </div>
              </div>

              <RawPhoto photoIndex={13} width={85} height={115} />

              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <RawPhoto photoIndex={14} width={60} height={55} />
                  <RawPhoto photoIndex={0} width={60} height={65} />
                </div>
                <RawPhoto photoIndex={1} width={65} height={75} />
              </div>
            </div>

            {/* BARIS 5 (BAWAH) */}
            <RawPhoto photoIndex={2} width={75} height={100} />
          </div>
        </div>

        {/* ========================================================= */}
        {/* LIGHTBOX / FULLSCREEN PREVIEW MODE                        */}
        {/* ========================================================= */}
        {activePhotoIndex !== null && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(15, 23, 36, 0.95)",
              zIndex: 10005,
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              boxSizing: "border-box",
              animation: "fadeIn 200ms ease-in-out",
            }}
          >
            {/* Tombol Kembali ke Galeri */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              style={{
                position: "absolute",
                top: "15px",
                left: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "0.85rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backdropFilter: "blur(4px)",
              }}
            >
              ← Back to Gallery
            </button>

            {/* Tombol Tutup Preview */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                backgroundColor: "#cb808b",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {/* AREA PREVIEW GAMBAR & TOMBOL PANAH */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "80%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Tombol Kiri (Previous) */}
              <button
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  backdropFilter: "blur(4px)",
                }}
              >
                ❮
              </button>

              {/* Tampilan Foto Utama */}
              <img
                src={galleryPhotos[activePhotoIndex].src}
                alt={galleryPhotos[activePhotoIndex].alt}
                style={{
                  maxWidth: "85%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              />

              {/* Tombol Kanan (Next) */}
              <button
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  backdropFilter: "blur(4px)",
                }}
              >
                ❯
              </button>
            </div>

            {/* INDIKATOR NOMOR FOTO */}
            <div
              style={{
                marginTop: "12px",
                color: "#ded8cc",
                fontSize: "0.85rem",
                letterSpacing: "1px",
                fontFamily: "sans-serif",
              }}
            >
              {activePhotoIndex + 1} / {galleryPhotos.length}
            </div>
          </div>
        )}
      </div>
    </>
  );
}