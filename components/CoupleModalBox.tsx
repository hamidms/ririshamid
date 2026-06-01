"use client";

import React from "react";

interface CoupleModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoupleModalBox({ isOpen, onClose }: CoupleModalBoxProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* TOMBOL SILANG FIXED OUTSIDE CONTAINER 
        Menggunakan posisi 'fixed' dengan perhitungan matematika dari batas luar modal:
        - top: 5% (posisi modal) + 20px (jarak ke dalam)
        - right: 5% (posisi modal) + 20px (jarak ke dalam)
      */}
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
          zIndex: 1000, // Memastikan tombol berada di lapisan paling atas
          boxShadow: "0 3px 10px rgba(0,0,0,0.3)"
        }}
      >
        ✕
      </button>

      {/* KONTAINER UTAMA MODAL */}
      <div style={{
        position: "fixed", 
        top: "5%",
        left: "5%",
        width: "90vw",
        height: "88vh", 
        backgroundColor: "#fbf9f5", 
        borderRadius: "24px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        zIndex: 999,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
        overflowY: "auto", 
        scrollSnapType: "y mandatory", 
        WebkitOverflowScrolling: "touch",
      }}>

        {/* ================= SECTION 1: YANG BERBAHAGIA ================= */}
        <section style={{
          flex: "0 0 100%", 
          height: "100%",
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6)), url('/gallery/couple/couple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "60px",
          boxSizing: "border-box",
          scrollSnapAlign: "start"
        }}>
          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.3rem",
            fontStyle: "italic",
            fontWeight: "normal",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.5)"
          }}>
            Yang Berbahagia
          </h1>
        </section>

        {/* ================= SECTION 2: THE BRIDE ================= */}
        <section style={{
          flex: "0 0 100%",
          height: "100%",
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('/gallery/couple/bride.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 20px 60px 20px",
          boxSizing: "border-box",
          scrollSnapAlign: "start",
          textAlign: "center"
        }}>
          <span style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "10px"
          }}>
            The Bride
          </span>

          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.2rem",
            fontWeight: "normal",
            color: "#ffffff",
            margin: "0 0 12px 0",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)"
          }}>
            Shalsabilla Rizky Rezatama
          </h1>

          <div style={{ display: "flex", alignItems: "center", width: "85%", maxWidth: "280px", marginBottom: "12px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
            <span style={{ padding: "0 10px", fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
              Putri pertama dari
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
          </div>

          <p style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.8)",
            margin: "0 0 25px 0",
            lineHeight: "1.4"
          }}>
            Bapak Eko Suprapto dan Ibu Faridah Handayani
          </p>

          <a 
            href="https://instagram.com/shalsa_r" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "20px",
              textDecoration: "none",
              fontFamily: "Arial, sans-serif",
              fontSize: "0.75rem",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @shalsa_r
          </a>
        </section>

        {/* ================= SECTION 3: THE GROOM ================= */}
        <section style={{
          flex: "0 0 100%",
          height: "100%",
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('/gallery/couple/groom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0 20px 60px 20px",
          boxSizing: "border-box",
          scrollSnapAlign: "start",
          textAlign: "center"
        }}>
          <span style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "10px"
          }}>
            The Groom
          </span>

          <h1 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2.2rem",
            fontWeight: "normal",
            color: "#ffffff",
            margin: "0 0 12px 0",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)"
          }}>
            Hamid Machfudin Sukardi
          </h1>

          <div style={{ display: "flex", alignItems: "center", width: "85%", maxWidth: "280px", marginBottom: "12px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
            <span style={{ padding: "0 10px", fontFamily: "'Georgia', serif", fontStyle: "italic", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
              Putra pertama dari
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.4)" }} />
          </div>

          <p style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.8)",
            margin: "0 0 25px 0",
            lineHeight: "1.4"
          }}>
            Bapak Sakiri dan Ibu Rukanah
          </p>

          <a 
            href="https://instagram.com/hamidmchs" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "20px",
              textDecoration: "none",
              fontFamily: "Arial, sans-serif",
              fontSize: "0.75rem",
              backdropFilter: "blur(5px)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @hamidmchs
          </a>
        </section>

      </div>
    </>
  );
}