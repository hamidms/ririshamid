"use client";

import React, { useState } from "react";

interface GiftModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftModalBox({ isOpen, onClose }: GiftModalBoxProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  // Data hadiah (2 ATM + 1 Alamat Fisik)
  const accountData = [
    {
      id: 1,
      type: "bank",
      name: "Shalsabilla Rizky Rezatama",
      contentValue: "7064928175", // Nomor Rekening
      displayValue: "7064 9281 75",
      labelLogo: "CIMB NIAGA",
      bgImage: "/gallery/gift/couple1.jpg",
      actionUrl: "https://wa.me/6282328928848?text=Halo%2C%20ini%20aku%20kasih%20hadiah" // Link WA
    },
    {
      id: 2,
      type: "bank",
      name: "Hamid machfudin sukardi",
      contentValue: "8045612398", // Nomor Rekening
      displayValue: "8045 6123 98",
      labelLogo: "BCA",
      bgImage: "/gallery/gift/couple2.jpg",
      actionUrl: "https://wa.me/6282328928848?text=Halo%2C%20ini%20aku%20kasih%20hadiah" // Link WA
    },
    {
      id: 3,
      type: "address",
      name: "Riris dan Hamid (Pak Eko BKK)",
      contentValue: "Jalan Sidodadi RT 02 RW 03, Mijen, Kota Semarang", // Yang akan disalin
      displayValue: "Jalan Sidodadi RT 02 RW 03, Mijen, Kota Semarang",
      labelLogo: "HADIAH", // Logo diganti teks/icon Hadiah
      bgImage: "/gallery/gift/map.png", // Bisa disesuaikan filenya jika ada gambar khusus
      actionUrl: "https://maps.app.goo.gl/hyKpSaUe3TvDLgzWA" // Link Google Maps
    }
  ];

  const handleCopy = (textToCopy: string, index: number) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      {/* TOMBOL SILANG FIXED */}
      <button 
        onClick={onClose} 
        style={{
          position: "fixed",
          top: "calc(5% + 20px)",
          right: "calc(5% + 20px)",
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
        zIndex: 999,
        boxSizing: "border-box",
        padding: "50px 16px 20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
        overflowY: "auto",
      }}>

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

        {/* AREA KARTU-KARTU */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "380px", 
          paddingBottom: "30px"
        }}>
          {accountData.map((card, index) => (
            <div 
              key={card.id}
              style={{
                width: "100%",
                aspectRatio: "1.9 / 1", 
                borderRadius: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                display: "flex",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#ffffff"
              }}
            >
              {/* SISI KIRI: BACKGROUND GAMBAR (70%) */}
              <div style={{
                flex: "0 0 70%",
                width: "70%",
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.65)), url('${card.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px 12px",
                boxSizing: "border-box"
              }}>
                {/* Chip EMV & Wave */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "24px",
                    height: "16px",
                    backgroundColor: "#e0b034",
                    borderRadius: "3px",
                    opacity: 0.9
                  }} />
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5">
                    <path d="M5 17.5c.88-1.33 2.44-2.2 4.2-2.2s3.32.87 4.2 2.2M3 20c1.55-2.5 4.43-4.17 7.7-4.17s6.15 1.67 7.7 4.17M7 15c.44-.75 1.15-1.25 2-1.25s1.56.5 2 1.25" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* INFO DATA UTAMA (REKENING / ALAMAT & NAMA) */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {/* VALUE UTAMA (NOMOR REKENING / ALAMAT JALAN) */}
                  <span style={{
                    fontFamily: card.type === "bank" ? "monospace" : "Arial, sans-serif",
                    fontSize: card.type === "bank" ? "0.9rem" : "0.6rem", // Alamat otomatis mengecil agar muat
                    fontWeight: "bold",
                    color: "#ffffff",
                    letterSpacing: card.type === "bank" ? "1.2px" : "normal",
                    textShadow: "1px 1px 3px rgba(0,0,0,0.95)",
                    lineHeight: "1.2",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // Maksimal alamat memotong jadi 2 baris agar tetap rapi
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {card.displayValue}
                  </span>
                  
                  {/* NAMA PEMILIK KARTU / PENERIMA */}
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "0.65rem",
                    color: "rgba(255, 255, 255, 0.9)",
                    letterSpacing: "0.5px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.9)",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {card.name}
                  </span>
                </div>
              </div>

              {/* SISI KANAN: LAJUR ACTIONS (30%) */}
              <div style={{
                flex: "0 0 30%",
                width: "30%",
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 4px",
                boxSizing: "border-box",
                borderLeft: "1px solid rgba(0,0,0,0.04)"
              }}>
                {/* Atas Kanan: Logo Bank atau Icon Hadiah */}
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  minHeight: "20px"
                }}>
                  {card.labelLogo === "HADIAH" ? (
                    /* TAMPILAN ICON KADO JIKA TIPE HADIAH FISIK */
                    <div style={{ display: "flex", alignItems: "center", gap: "2px", color: "#e67e22" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11 8V2.052c-2.313.251-4.5 1.583-4.5 3.948 0 2.213 1.944 3.391 4.5 3.911zm2-5.948V8c2.556-.52 4.5-1.697 4.5-3.911 0-2.365-2.187-3.697-4.5-3.948zM22 12v-2h-3.135c-.393-.761-.963-1.418-1.661-1.921 1.055-.426 1.796-1.464 1.796-2.67 0-1.996-1.846-3.409-4.5-3.409-1.396 0-2.645.402-3.5 1.042-.855-.64-2.104-1.042-3.5-1.042-2.654 0-4.5 1.413-4.5 3.409 0 1.206.741 2.244 1.796 2.67-.698.503-1.268 1.16-1.661 1.921H2v2h1v10c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V12h1zM6.5 6c0-.853.691-1.409 1.5-1.409.807 0 1.5.556 1.5 1.409 0 .862-.689 1.411-1.5 1.411-.811 0-1.5-.549-1.5-1.411zm8.5 1.411c-.811 0-1.5-.549-1.5-1.411 0-.853.691-1.409 1.5-1.409.807 0 1.5.556 1.5 1.409 0 .862-.689 1.411-1.5 1.411zM11 12H5v8h6v-8zm8 8h-6v-8h6v8z"/>
                      </svg>
                      <span style={{ fontSize: "0.55rem", fontWeight: "900", letterSpacing: "0.5px" }}>GIFT</span>
                    </div>
                  ) : (
                    /* TAMPILAN LOGO BANK BIASA */
                    <div style={{
                      fontFamily: "'Helvetica Neue', Arial, sans-serif",
                      fontWeight: "900",
                      fontSize: card.labelLogo === "BCA" ? "0.9rem" : "0.7rem",
                      color: card.labelLogo === "BCA" ? "#0056a3" : "#c0392b",
                      textAlign: "center",
                      lineHeight: "1",
                      width: "100%"
                    }}>
                      {card.labelLogo}
                    </div>
                  )}
                </div>

                {/* AREA DUA TOMBOL AKSI */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  width: "100%",
                  alignItems: "center"
                }}>
                  {/* TOMBOL DINAMIS: KONFIRMASI WA / BUKA MAPS */}
                  <button
                    onClick={() => window.open(card.actionUrl, "_blank")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      maxWidth: "85px",
                      backgroundColor: card.type === "bank" ? "#25D366" : "#4285F4", // WA Hijau, Maps Biru Google
                      color: "#ffffff",
                      border: "none",
                      padding: "5px 2px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.52rem",
                      fontWeight: "bold",
                      transition: "all 0.2s ease",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                      {card.type === "bank" ? (
                        <>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397 0 11.966 0c3.178.001 6.165 1.24 8.413 3.494 2.25 2.253 3.487 5.244 3.484 8.425-.003 6.616-5.34 11.963-11.909 11.963-2.005-.001-3.98-.507-5.73-1.472L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.883-6.963C16.438 1.928 13.965.904 11.34.904c-5.436 0-9.861 4.42-9.864 9.853-.001 1.748.478 3.454 1.388 4.966L1.813 21.66l6.002-1.574z"/>
                          </svg>
                          <span>Konfirmasi</span>
                        </>
                      ) : (
                        <>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span>Buka Maps</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* TOMBOL SALIN (MENYALIN VALUE: REK / ALAMAT) */}
                  <button
                    onClick={() => handleCopy(card.contentValue, index)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      maxWidth: "85px",
                      backgroundColor: copiedIndex === index ? "#2ecc71" : "#f8f9fa",
                      color: copiedIndex === index ? "#ffffff" : "#34495e",
                      border: "1px solid #dcdde1",
                      padding: "5px 2px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.55rem",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                  >
                    {copiedIndex === index ? (
                      "Ok!"
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Salin</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  );
}