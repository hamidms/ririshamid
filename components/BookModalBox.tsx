"use client";

import React, { useState, useEffect } from "react";

interface BookModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGallery?: () => void; // Prop opsional untuk membuka Gallery Modal
}

export default function BookModalBox({ isOpen, onClose, onOpenGallery }: BookModalBoxProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

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
      type: "photo",
      src: "/gallery/book/photo1.jpg",
      title: "First of Our Journey",
      desc: "Seperti trend \"Baby you are familiar\", kisah kami bermula sejak kecil, saat pertama kali bertemu dan bermain bersama di taman kanak-kanak desa. Setelah berpisah ke sekolah yang berbeda, hubungan kami berlanjut hanya lewat cerita ibu dan media sosial, hingga akhirnya dipertemukan kembali oleh takdir.",
      rotate: "-2deg",
    },
    {
      type: "photo",
      src: "/gallery/book/photo2.jpg",
      title: "Red String of Fate",
      desc: "Kami sempat mengira kisah ini berhenti di masa TK, meski tinggal berdekatan, tak pernah sekalipun dipertemukan kembali secara kebetulan. Hingga akhirnya takdir mempertemukan kami dalam satu komunitas, menyadarkan bahwa jalan kami selalu beriringan meski sempat berjalan masing-masing.",
      rotate: "1.5deg",
    },
    {
      type: "photo",
      src: "/gallery/book/photo3.jpg",
      title: "Heartbreak Anniversary",
      desc: "Meski berada di komunitas yang sama, kami tak pernah bertemu karena jadwal yang selalu bertabrakan, namun tetap terhubung sebagai tempat berbagi cerita. Hingga ajakan untuk menonton sebuah konser “Patah Hati” merubah segalanya. Singkat cerita, saat akhir acara Hindia menyanyikan lagu \"Cincin\" dan kembang api menyala meriah di atas kami. Disana tatapan mata kami bertemu dan terkunci, sesaat setelahnya, kami tersadar bahwa kami sudah saling menaruh hati.",
      rotate: "-1deg",
    },
    {
      type: "photo",
      src: "/gallery/book/photo4.jpg",
      title: "Under Sora’s Sky",
      desc: "Seminggu kemudian, pada 07.07.24, kami meresmikan hubungan di sebuah kafe, Sora yang berarti langit, kami takjub pada cara semesta mempertemukan yang ternyata sedekat tetangga. Sejak awal, obrolan tentang hidup, pernikahan, dan arti keluarga menumbuhkan keyakinan bahwa kami telah menemukan satu sama lain.",
      rotate: "2deg",
    },
    {
      type: "photo",
      src: "/gallery/book/photo5.jpg",
      title: "Traditional Propose Ceremony",
      desc: "Pada 28 Juni 2025, Hamid bersama keluarganya datang ke rumah untuk menyampaikan niat membawa hubungan kami ke tahap yang lebih serius, dan alhamdulillah mendapat restu dari orang tuaku. Dalam tradisi Jawa, momen ini dikenal sebagai Ndodog lawang atau nembung.",
      rotate: "-1.5deg",
    },
    {
      type: "photo",
      src: "/gallery/book/photo6.jpg",
      title: "Feast of Love",
      desc: "Tepat pada 15 Oktober 2026, bahtera kami resmi berlayar diiringi dengan tautan doa yang membuka pintu Arsy dalam janji suci di KUA Mijen. Tiga hari berselang, untuk melengkapi kebahagiaan tersebut, kami mengundang kehadiran serta doa restu sanak saudara dan sahabat dalam hangatnya “Walimatul Ursy” agar langkah kami kian bermakna di babak baru ini. Sampai bertemu di chapter chapter selanjutnya!!!",
      rotate: "1deg",
    },
    {
      type: "action",
      title: "Our Gallery",
      desc: "lihat momen yang berhasil kami tangkap lainnya",
      rotate: "-2deg",
    },
  ];

  const handleCardClick = (item: (typeof galleryItems)[0]) => {
    if (item.type === "action") {
      onClose();
      if (onOpenGallery) {
        onOpenGallery();
      }
    }
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
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 9998,
          opacity: animate ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* TOMBOL SILANG */}
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

      {/* MODAL UTAMA */}
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
          backgroundImage: "linear-gradient(to right, rgba(22, 42, 64, 0.04) 1px, transparent 1px)",
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
              color: "#162a40",
              margin: 0,
            }}
          >
            Our Story
          </h1>

          <div
            style={{
              width: "100%",
              height: "10px",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 12' width='100%25' height='12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 C150,12 150,0 300,6 C450,12 450,0 600,6 C750,12 750,0 900,6 C1050,12 1050,0 1200,6' fill='none' stroke='%23162a40' stroke-width='2'/%3E%3C/svg%3E\")",
              backgroundRepeat: "repeat-x",
              margin: "8px 0",
            }}
          />

          <p
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#162a40",
              opacity: 0.8,
              fontSize: "0.85rem",
              lineHeight: "1.4",
              margin: 0,
            }}
          >
            A timeline of how our paths crossed, reconnected, and bound together in love.
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
          {galleryItems.map((item, idx) => {
            const isActionCard = item.type === "action";

            return (
              <div
                key={idx}
                onClick={() => handleCardClick(item)}
                style={{
                  flex: "0 0 240px",
                  backgroundColor: isActionCard ? "#f4efe6" : "#ffffff",
                  padding: "16px 14px 20px 14px",
                  borderRadius: "8px",
                  transform: `rotate(${item.rotate})`,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: isActionCard ? "center" : "flex-start",
                  gap: isActionCard ? "16px" : "10px",
                  scrollSnapAlign: "center",
                  border: isActionCard ? "2px dashed #cb808b" : "1px solid rgba(22, 42, 64, 0.08)",
                  cursor: isActionCard ? "pointer" : "default",
                  minHeight: isActionCard ? "260px" : "auto",
                  textAlign: isActionCard ? "center" : "left",
                }}
              >
                {/* AKSEN ISOLASI/SELOTIP */}
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

                {/* FOTO POLAROID (HANYA UNTUK KARTU CERITA) */}
                {item.type === "photo" && (
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
                )}

                {/* TEKS KETERANGAN */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h3
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: isActionCard ? "1.5rem" : "1.1rem",
                      color: isActionCard ? "#cb808b" : "#162a40",
                      margin: 0,
                      fontWeight: isActionCard ? "bold" : "normal",
                      fontStyle: isActionCard ? "italic" : "normal",
                    }}
                  >
                    {item.title}
                  </h3>

                  {!isActionCard && (
                    <div style={{ width: "100%", height: "1px", backgroundColor: "#e6dfd5", margin: "2px 0" }} />
                  )}

                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: isActionCard ? "0.85rem" : "0.75rem",
                      color: "#162a40",
                      opacity: 0.75,
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    {item.desc}
                  </p>

                  {isActionCard && (
                    <span
                      style={{
                        marginTop: "10px",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        color: "#cb808b",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                      }}
                    >
                      Buka Galeri ➔
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* INDIKATOR SWIPE */}
        <div
          style={{
            textAlign: "center",
            fontSize: "0.7rem",
            color: "#162a40",
            opacity: 0.5,
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