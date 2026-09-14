"use client";

import React, { useState, useEffect } from "react";

interface GiftModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftModalBox({ isOpen, onClose }: GiftModalBoxProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
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

  // Data hadiah (2 ATM + 1 Alamat Fisik)
  const accountData = [
    {
      id: 1,
      type: "bank",
      name: "Shalsabilla Rizky Rezatama",
      contentValue: "2002709875",
      displayValue: "2002 7098 75",
      logoImg: "/gallery/assets/logo-bank-BSN.webp",
      bgImage: "/gallery/gift/couple1.jpg",
      actionUrl: "https://wa.me/6282328928848?text=Halo%2C%20ini%20aku%20kasih%20hadiah"
    },
    {
      id: 2,
      type: "bank",
      name: "Hamid machfudin sukardi",
      contentValue: "8045612398",
      displayValue: "8045 6123 98",
      logoImg: "/gallery/assets/logo-bank-BCA.webp",
      bgImage: "/gallery/gift/couple2.jpg",
      actionUrl: "https://wa.me/6282328928848?text=Halo%2C%20ini%20aku%20kasih%20hadiah"
    },
    {
      id: 3,
      type: "address",
      name: "Riris dan Hamid (Pak Eko BKK)",
      contentValue: "Jalan Sidodadi RT 02 RW 03, Mijen, Kota Semarang",
      displayValue: "Jalan Sidodadi RT 02 RW 03, Mijen, Kota Semarang",
      logoImg: null,
      bgImage: "/gallery/gift/map.png",
      actionUrl: "https://maps.app.goo.gl/hyKpSaUe3TvDLgzWA"
    }
  ];

  const handleCopy = (textToCopy: string, index: number) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* OVERLAY / BACKDROP DENGAN FADE */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 998,
          opacity: animate ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          backdropFilter: "blur(4px)"
        }}
      />

      {/* WINDOW MODAL UTAMA DENGAN FADE & SCALE */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "5%",
          width: "90vw",
          height: "88vh",
          backgroundColor: "#f4f1ea",
          borderRadius: "24px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
          zIndex: 999,
          boxSizing: "border-box",
          padding: "50px 16px 20px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
          overflowY: "auto",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        {/* TOMBOL SILANG */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
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
            zIndex: 1000,
            boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
          }}
        >
          ✕
        </button>

        {/* HEADER MODAL */}
        <div style={{ textAlign: "center", marginBottom: "25px", marginTop: "10px" }}>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "1.8rem",
            fontStyle: "italic",
            color: "#2c3e50",
            margin: "0 0 8px 0"
          }}>
            Wedding Gift
          </h2>
          <p style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.8rem",
            color: "#7f8c8d",
            maxWidth: "320px",
            lineHeight: "1.4",
            margin: 0
          }}>
            Doa restu Anda adalah karunia terindah. Namun jika ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui rekening atau alamat di bawah ini:
          </p>
        </div>

        {/* AREA KARTU-KARTU ATM */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "100%",
          maxWidth: "380px",
          paddingBottom: "30px"
        }}>
          {accountData.map((card, index) => (
            <div
              key={card.id}
              style={{
                width: "100%",
                aspectRatio: "1.6 / 1",
                borderRadius: "20px",
                boxShadow: "0 10px 28px rgba(0,0,0,0.25)",
                overflow: "hidden",
                position: "relative",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.15)), url('${card.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "16px 20px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              {/* BARIS 1: LOGO BANK / TIPE ALAMAT */}
              <div style={{ height: "32px", display: "flex", alignItems: "center" }}>
                {card.logoImg ? (
                  <img
                    src={card.logoImg}
                    alt="Bank Logo"
                    style={{ height: "100%", maxWidth: "120px", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    letterSpacing: "1px",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.8)"
                  }}>
                    ALAMAT
                  </span>
                )}
              </div>

              {/* BARIS 2: TENGAH (CHIP DENGAN TOMBOL AKSI DI KANAN SEJAJAR) */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                {/* CHIP ATM */}
                <img
                  src="/gallery/assets/chip.png"
                  alt="Chip ATM"
                  style={{ width: "38px", height: "auto", borderRadius: "4px" }}
                />

                {/* TOMBOL AKSI (CONFIRM/MAPS & COPY) DI KANAN ATAS/TENGAH */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  minWidth: "85px"
                }}>
                  <button
                    onClick={() => window.open(card.actionUrl, "_blank")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      width: "100%",
                      backgroundColor: "rgba(46, 204, 113, 0.25)",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      padding: "5px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.65rem",
                      fontWeight: "500",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {card.type === "bank" ? (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.966 0c3.178.001 6.165 1.24 8.413 3.494 2.25 2.253 3.487 5.244 3.484 8.425-.003 6.616-5.34 11.963-11.909 11.963-2.005-.001-3.98-.507-5.73-1.472L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.883-6.963C16.438 1.928 13.965.904 11.34.904c-5.436 0-9.861 4.42-9.864 9.853-.001 1.748.478 3.454 1.388 4.966L1.813 21.66l6.002-1.574z"/>
                        </svg>
                        <span>Confirm</span>
                      </>
                    ) : (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span>Maps</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopy(card.contentValue, index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      width: "100%",
                      backgroundColor: copiedIndex === index ? "rgba(46, 204, 113, 0.25)" : "rgba(40, 40, 40, 0.75)",
                      color: "#ffffff",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      padding: "5px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.65rem",
                      fontWeight: "500",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {copiedIndex === index ? (
                      "Copied"
                    ) : (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* BARIS 3: BAWAH (NOMOR REKENING / ALAMAT & NAMA) FULL WIDTH */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
                width: "100%"
              }}>
                <span style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: card.type === "bank" ? "1.15rem" : "0.85rem",
                  fontWeight: "bold",
                  color: "#ffffff",
                  letterSpacing: card.type === "bank" ? "1.5px" : "0.3px",
                  textShadow: "1px 2px 4px rgba(0,0,0,0.3)",
                  lineHeight: "1.2",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {card.displayValue}
                </span>

                <span style={{
                  fontFamily: "'Courier New', Courier, monospace",
                  fontSize: "0.65rem",
                  color: "rgba(255, 255, 255, 0.95)",
                  letterSpacing: "0.8px",
                  textShadow: "1px 1px 3px rgba(0,0,0,0.9)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis"
                }}>
                  {card.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}