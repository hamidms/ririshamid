"use client";

import React, { useState, useEffect, useRef } from "react";

interface RingModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function RingModalBox({ isOpen, onClose }: RingModalBoxProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("Loading...");
  
  const timeOffsetRef = useRef<number>(0);

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

  // Fetch Waktu Internet (Asia/Jakarta)
  useEffect(() => {
    if (!shouldRender) return;

    const fetchWibTime = async () => {
      try {
        const res = await fetch("https://worldtimeapi.org/api/timezone/Asia/Jakarta");
        const data = await res.json();
        const serverWibTimestamp = new Date(data.datetime).getTime();
        const localTimestamp = Date.now();
        timeOffsetRef.current = serverWibTimestamp - localTimestamp;
      } catch (err) {
        console.warn("WorldTimeAPI error, fallback to timeapi.io...", err);
        try {
          const res2 = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Jakarta");
          const data2 = await res2.json();
          const serverWibTimestamp = new Date(`${data2.dateTime}Z`).getTime() - (7 * 3600 * 1000);
          timeOffsetRef.current = serverWibTimestamp - Date.now();
        } catch (e) {
          console.error("Gagal ambil waktu internet:", e);
          timeOffsetRef.current = 0;
        }
      }
    };

    fetchWibTime();
  }, [shouldRender]);

  // Tick Interval untuk Countdown & Jam
  useEffect(() => {
    if (!shouldRender) return;

    const tick = () => {
      const nowWib = new Date(Date.now() + timeOffsetRef.current);

      const formattedWib =
        nowWib
          .toLocaleTimeString("id-ID", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })
          .replace(/:/g, ".") + " WIB";

      setCurrentTimeStr(formattedWib);

      // Target: 18 Oktober jam 09:00:00 WIB
      let targetYear = nowWib.getFullYear();
      let targetDate = new Date(Date.UTC(targetYear, 9, 18, 2, 0, 0));

      if (nowWib.getTime() > targetDate.getTime()) {
        targetDate = new Date(Date.UTC(targetYear + 1, 9, 18, 2, 0, 0));
      }

      const diff = targetDate.getTime() - nowWib.getTime();

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          backdropFilter: "blur(8px)",
          zIndex: 9998,
          opacity: animate ? 1 : 0,
          transition: "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* MODAL CONTAINER WITH VIDEO BACKGROUND */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: animate
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.95)",
          width: "90vw",
          maxWidth: "340px",
          backgroundColor: "#000000",
          color: "#ffffff",
          borderRadius: "28px",
          padding: "35px 24px 28px 24px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
          zIndex: 10000,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: animate ? 1 : 0,
          transition:
            "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          overflow: "hidden", // Memastikan video tidak meluap keluar border-radius
        }}
      >
        {/* VIDEO BACKGROUND */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        >
          <source src="/video/video.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY GELAP (Agar Teks Kontras dan Tetap Terbaca Mudan) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 2,
          }}
        />

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "20px",
            background: "none",
            border: "none",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "22px",
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* KONTEN UTAMA - COUNTDOWN */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
            margin: "24px 0 32px 0",
          }}
        >
          {/* DAYS */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
            <span style={{ fontSize: "4.5rem", fontWeight: "700", lineHeight: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {timeLeft.days}
            </span>
            <span style={{ fontSize: "1rem", fontWeight: "600", marginLeft: "12px", letterSpacing: "1px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              DAYS
            </span>
          </div>

          {/* HOURS */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
            <span style={{ fontSize: "4.5rem", fontWeight: "700", lineHeight: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "1rem", fontWeight: "600", marginLeft: "12px", letterSpacing: "1px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              HOURS
            </span>
          </div>

          {/* MINUTES */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
            <span style={{ fontSize: "4.5rem", fontWeight: "700", lineHeight: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "1rem", fontWeight: "600", marginLeft: "12px", letterSpacing: "1px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              MINUTES
            </span>
          </div>

          {/* SECONDS */}
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }}>
            <span style={{ fontSize: "4.5rem", fontWeight: "700", lineHeight: 1, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "1rem", fontWeight: "600", marginLeft: "12px", letterSpacing: "1px", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
              SECONDS
            </span>
          </div>
        </div>

        {/* WAKTU SAAT INI */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            borderTop: "1px solid rgba(255, 255, 255, 0.25)",
            paddingTop: "16px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "0.7rem",
              color: "rgba(255, 255, 255, 0.65)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              marginBottom: "6px",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            Until we Say
          </div>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#ffffff",
              letterSpacing: "0.5px",
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            I Do
          </div>
        </div>
      </div>
    </>
  );
}