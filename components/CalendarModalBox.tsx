"use client";

import React, { useEffect, useState } from "react";

interface CalendarModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarModalBox({ isOpen, onClose }: CalendarModalBoxProps) {
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

  // Data Tanggal (4 Hari) — Tanggal 15 & 18 di-highlight (dilingkari)
  const calendarData = [
    { dayName: "Kamis", date: 15, isHighlighted: true },
    { dayName: "Jumat", date: 16, isHighlighted: false },
    { dayName: "Sabtu", date: 17, isHighlighted: false },
    { dayName: "Minggu", date: 18, isHighlighted: true },
  ];

  // Data Rundown / Rangkaian Acara
  const rundownData = [
    { time: "09.00", event: "Akad" },
    { time: "09.00", event: "Pasrah Tampi" },
    { time: "11.00", event: "Kirab Pengantin" },
    { time: "11.30", event: "Live Music" },
    { time: "13.00", event: "Closing Session 1" },
  ];

  return (
    <>
      {/* IMPORT GOOGLE FONT PINYON SCRIPT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
      `}</style>

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
          backdropFilter: "blur(4px)",
        }}
      />

      {/* MODAL CONTAINER DENGAN FADE & SCALE */}
      <div
        style={{
          position: "fixed",
          top: "5%",
          left: "5%",
          width: "90vw",
          height: "88vh",
          backgroundColor: "#fdfbf7",
          borderRadius: "24px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
          zIndex: 999,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Caveat', cursive, sans-serif",
          opacity: animate ? 1 : 0,
          transform: animate ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* TOMBOL SILANG */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "36px",
            height: "36px",
            backgroundColor: "#cb808b", // Warna pink
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
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          }}
        >
          ✕
        </button>

        {/* CONTAINER BISA DI-SCROLL */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "30px 20px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* ================= SECTION 1: TANGGAL ================= */}
          <section style={{ marginBottom: "40px", textAlign: "center" }}>
            <h1
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "3.5rem",
                color: "#162a40", // Warna biru
                margin: "0 0 10px 0",
                lineHeight: "1.2",
                fontWeight: "400",
              }}
            >
              Save the Date!
            </h1>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
                maxWidth: "500px",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${calendarData.length}, 1fr)`,
                  width: "100%",
                  borderTop: "3px solid #162a40",
                  borderBottom: "3px solid #162a40",
                }}
              >
                {calendarData.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRight: idx < calendarData.length - 1 ? "3px solid #162a40" : "none",
                      paddingBottom: "15px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        padding: "8px 0",
                        borderBottom: "3px solid #162a40",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        color: "#162a40", // Warna biru
                      }}
                    >
                      {item.dayName}
                    </div>

                    <div
                      style={{
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "2.8rem",
                          fontWeight: "900",
                          color: "#162a40", // Warna biru
                          zIndex: 2,
                        }}
                      >
                        {item.date}
                      </span>

                      {item.isHighlighted && (
                        <svg
                          style={{
                            position: "absolute",
                            width: "80px",
                            height: "80px",
                            zIndex: 3,
                            pointerEvents: "none",
                          }}
                          viewBox="0 0 100 100"
                        >
                          <path
                            d="M 50 12 C 72 10, 92 28, 88 52 C 84 76, 62 90, 42 88 C 22 86, 10 66, 14 44 C 18 22, 38 12, 58 10"
                            fill="none"
                            stroke="#cb808b" // Warna pink
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M 55 15 C 75 12, 90 32, 85 54 C 80 74, 58 86, 38 84 C 18 82, 12 62, 16 42 C 20 24, 42 14, 62 13 C 78 12, 86 28, 84 45"
                            fill="none"
                            stroke="#cb808b" // Warna pink
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.85"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= SECTION 2: RANGKAIAN ACARA (RUNDOWN) ================= */}
          <section style={{ maxWidth: "500px", margin: "0 auto 50px auto" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "sans-serif",
              }}
            >
              {rundownData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 10px",
                    borderBottom: "1px solid rgba(22, 42, 64, 0.25)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "800",
                      color: "#162a40", // Warna biru
                      width: "70px",
                      textAlign: "left",
                    }}
                  >
                    {item.time}
                  </span>

                  <span
                    style={{
                      fontSize: "1.1rem",
                      color: "#cb808b", // Warna pink
                      margin: "0 15px",
                      display: "inline-block",
                    }}
                  >
                    ♥
                  </span>

                  <span
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#162a40", // Warna biru
                      flex: 1,
                      textAlign: "left",
                    }}
                  >
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= SECTION 3: TITIK ACARA ================= */}
          <section style={{ maxWidth: "500px", margin: "0 auto", paddingBottom: "30px" }}>
            <h2
              style={{
                fontFamily: "'Pinyon Script', cursive",
                textAlign: "center",
                fontSize: "2.3rem",
                color: "#162a40", // Warna biru
                margin: "0 0 20px 0",
                fontWeight: "900",
              }}
            >
              Our Location
            </h2>

            <a
              href="https://maps.app.goo.gl/x7JpDMNBNTgdfD4x7"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                width: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                textDecoration: "none",
              }}
            >
              <img
                src="/gallery/assets/map.jpg"
                alt="Peta Titik Acara"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </a>
          </section>
        </div>
      </div>
    </>
  );
}