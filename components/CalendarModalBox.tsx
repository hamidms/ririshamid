"use client";

import React from "react";

interface CalendarModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalendarModalBox({ isOpen, onClose }: CalendarModalBoxProps) {
  if (!isOpen) return null;

  // Data Tanggal (4 Hari) — Tanggal 15 & 18 di-highlight (dilingkari)
  const calendarData = [
    { dayName: "Kamis", date: 15, isHighlighted: true },
    { dayName: "Jumat", date: 16, isHighlighted: false },
    { dayName: "Sabtu", date: 17, isHighlighted: false },
    { dayName: "Minggu", date: 18, isHighlighted: true },
  ];

  // Data Rundown / Rangkaian Acara
  const rundownData = [
    { time: "10.00", event: "Registration & Open Gate" },
    { time: "11.00", event: "Opening Speech" },
    { time: "11.15", event: "Local Band 1" },
    { time: "12.00", event: "Local Band 2" },
    { time: "12.45", event: "DJ Set 1" },
    { time: "13.30", event: "Games & Intermezzo" },
    { time: "14.00", event: "Guest Band A" },
    { time: "15.00", event: "DJ Set 2" },
    { time: "16.00", event: "National Band" },
    { time: "17.00", event: "Sunset Break / F&B Time" },
    { time: "17.30", event: "Special Performance" },
    { time: "18.30", event: "Closing / DJ Final Set" },
  ];

  return (
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
        <section style={{ marginBottom: "50px", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.8rem",
              color: "#2d5a27",
              margin: "0 0 20px 0",
              lineHeight: "1.1",
              fontWeight: "900",
              letterSpacing: "1px",
            }}
          >
            Catat
            <br />
            Tanggalnya!!
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
                borderTop: "3px solid #2d5a27",
                borderBottom: "3px solid #2d5a27",
              }}
            >
              {calendarData.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRight: idx < calendarData.length - 1 ? "3px solid #2d5a27" : "none",
                    paddingBottom: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: "8px 0",
                      borderBottom: "3px solid #2d5a27",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "#2d5a27",
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
                        color: "#2d5a27",
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
                          stroke="#8b2626"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M 55 15 C 75 12, 90 32, 85 54 C 80 74, 58 86, 38 84 C 18 82, 12 62, 16 42 C 20 24, 42 14, 62 13 C 78 12, 86 28, 84 45"
                          fill="none"
                          stroke="#8b2626"
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

        {/* ================= SECTION 2: RANGKAIAN ACARA ================= */}
        <section style={{ maxWidth: "500px", margin: "0 auto 50px auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "2.3rem",
              color: "#2d5a27",
              margin: "0 0 25px 0",
              fontWeight: "900",
            }}
          >
            Rangkaian Acara
          </h2>

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
                  borderBottom: "1px solid rgba(45, 90, 39, 0.25)",
                }}
              >
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "800",
                    color: "#2d5a27",
                    width: "70px",
                    textAlign: "left",
                  }}
                >
                  {item.time}
                </span>

                <span
                  style={{
                    fontSize: "1.1rem",
                    color: "#8b2626",
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
                    color: "#2d5a27",
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
              textAlign: "center",
              fontSize: "2.3rem",
              color: "#2d5a27",
              margin: "0 0 20px 0",
              fontWeight: "900",
            }}
          >
            Titik Acara
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
  );
}