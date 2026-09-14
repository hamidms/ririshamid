"use client";

import React, { useState, useRef, useEffect } from "react";

interface PhoneModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string | null;
}

// ==========================================
// INTERFACE UNTUK DATA PESAN SUPABASE
// ==========================================
interface MessageData {
  id: number;
  nama: string;
  pesan: string;
  kehadiran: string;
  jumlah_orang: number;
  audio_url: string;
  created_at?: string;
  updated_at?: string;
}

// ==========================================
// SUB-KOMPONEN: MESSAGE LIST (GRID PESAN & AUDIO)
// ==========================================
function MessageList({ refreshTrigger }: { refreshTrigger: number }) {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/get-messages");
        const result = await res.json();
        if (result.success) {
          setMessages(result.data);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [refreshTrigger]);

  // Skema warna nama tamu
  const getNameColor = (item: MessageData) => {
    if (item.kehadiran === "tidak-hadir") {
      return "#e84393"; // Pink untuk tidak hadir
    }
    if (item.jumlah_orang === 1 || item.kehadiran === "datang-sendiri") {
      return "#8e44ad"; // Ungu untuk hadir 1 orang
    }
    if (item.jumlah_orang === 2 || item.kehadiran === "datang-berdua") {
      return "#2980b9"; // Biru untuk hadir 2 orang
    }
    return "#162a40"; // Fallback ke warna utama
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}, ${hours}:${minutes}`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0", color: "#162a40", fontFamily: "sans-serif", fontSize: "0.9rem", opacity: 0.8 }}>
        Memuat ucapan...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0", color: "#162a40", fontStyle: "italic", fontFamily: "sans-serif", fontSize: "0.85rem", opacity: 0.6 }}>
        Belum ada ucapan yang tersimpan.
      </div>
    );
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "1.4rem",
          fontStyle: "italic",
          color: "#162a40",
          marginBottom: "16px",
          borderTop: "1px dashed rgba(22, 42, 64, 0.15)",
          paddingTop: "24px",
        }}
      >
        Ucapan & Voice Note Tamu
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {messages.map((item) => {
          const timeStamp = item.updated_at || item.created_at;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #e3dcce",
                boxShadow: "0 2px 8px rgba(22, 42, 64, 0.05)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Header Kartu: Nama (Kiri) & Tanggal (Kanan) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    color: getNameColor(item),
                  }}
                >
                  {item.nama || "Tamu"}
                </span>

                {timeStamp && (
                  <span style={{ fontSize: "0.75rem", color: "#162a40", opacity: 0.6, fontFamily: "sans-serif" }}>
                    {formatDate(timeStamp)}
                  </span>
                )}
              </div>

              {/* Konten Pesan */}
              <p
                style={{
                  fontFamily: "sans-serif",
                  fontSize: "0.9rem",
                  color: "#162a40",
                  margin: 0,
                  lineHeight: "1.4",
                  whiteSpace: "pre-wrap",
                }}
              >
                {item.pesan || "Tanpa pesan teks."}
              </p>

              {/* Konten Audio VN jika tersedia */}
              {item.audio_url && (
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingTop: "4px" }}>
                  <audio src={item.audio_url} controls preload="metadata" style={{ width: "100%", height: "32px" }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN UTAMA: PHONE MODAL BOX DENGAN WAKTU & WARNA DISEDERHANAKAN
// ==========================================
export default function PhoneModalBox({ isOpen, onClose, guestName }: PhoneModalBoxProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  // State Form
  const [pesan, setPesan] = useState("");
  const [kehadiran, setKehadiran] = useState("datang-sendiri");

  // State Fitur Voice Note (VN)
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  // State Pemicu Refresh List Pesan
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  if (!shouldRender) return null;

  const getSupportedMimeType = () => {
    const types = ["audio/webm", "audio/mp4", "audio/ogg", "audio/aac"];
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }
    return "";
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = getSupportedMimeType();

      const mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const finalMimeType = mediaRecorder.mimeType || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type: finalMimeType });
        const url = URL.createObjectURL(blob);

        if (audioUrl) URL.revokeObjectURL(audioUrl);

        setAudioBlob(blob);
        setAudioUrl(url);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecordingTime(0);
      setIsRecording(true);
      setAudioUrl(null);
      setAudioBlob(null);
    } catch (err) {
      console.error("Gagal mengakses mikrofon:", err);
      alert("Mohon izinkan akses mikrofon untuk merekam VN.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const deleteRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let jumlahOrang = 0;
    if (kehadiran === "datang-sendiri") {
      jumlahOrang = 1;
    } else if (kehadiran === "datang-berdua") {
      jumlahOrang = 2;
    }

    const formData = new FormData();
    formData.append("pesan", pesan);
    formData.append("kehadiran", kehadiran);
    formData.append("jumlah_orang", jumlahOrang.toString());
    if (guestName) {
      formData.append("nama_tamu", guestName);
    }

    if (audioBlob) {
      const mime = audioBlob.type;
      let ext = "webm";
      if (mime.includes("mp4") || mime.includes("aac")) ext = "m4a";
      if (mime.includes("ogg")) ext = "ogg";

      const fileVN = new File([audioBlob], `voicenote.${ext}`, { type: mime });
      formData.append("voiceNote", fileVN);
    }

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Pesan dan Voice Note kamu berhasil dikirim! 🎉");

        setPesan("");
        deleteRecording();

        setRefreshTrigger((prev) => prev + 1);
      } else {
        alert(`Gagal mengirim: ${result.error}`);
      }
    } catch (error) {
      console.error("Kesalahan koneksi:", error);
      alert("Terjadi kesalahan jaringan.");
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

      {/* TOMBOL SILANG FIXED DENGAN WARNA #cb808b */}
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
        {/* HEADER AREA */}
        <div
          style={{
            padding: "25px 20px 15px 20px",
            position: "relative",
            borderBottom: "1px dashed rgba(22, 42, 64, 0.15)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "2.4rem",
              fontStyle: "italic",
              fontWeight: "normal",
              color: "#162a40",
              margin: 0,
            }}
          >
            Kirim Pesan
          </h1>

        </div>

        {/* AREA FORM & LIST (SCROLLABLE) */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* 1. INPUT TEXT */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#162a40", fontSize: "1.1rem" }}>
              Silakan masukkan pesan:
            </label>
            <textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis ucapan atau pesanmu di sini..."
              required
              rows={4}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #c9bda7",
                backgroundColor: "#ffffff",
                fontFamily: "sans-serif",
                fontSize: "0.9rem",
                color: "#162a40",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
          </div>

          {/* 2. PILIHAN KEHADIRAN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#162a40", fontSize: "1.1rem" }}>
              Konfirmasi Kehadiran:
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { id: "tidak-hadir", label: "Tidak bisa hadir" },
                { id: "datang-sendiri", label: "Datang sendiri" },
                { id: "datang-berdua", label: "Datang berdua" },
              ].map((option) => (
                <label
                  key={option.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.95rem",
                    color: "#162a40",
                    fontFamily: "sans-serif",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="kehadiran"
                    value={option.id}
                    checked={kehadiran === option.id}
                    onChange={(e) => setKehadiran(e.target.value)}
                    style={{ accentColor: "#cb808b", width: "18px", height: "18px" }}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* 3. MODUL VOICE NOTE */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#162a40", fontSize: "1.1rem" }}>
              Pesan Suara / Voice Note (Opsional):
            </label>

            <div
              style={{
                border: "1px dashed #c9bda7",
                borderRadius: "12px",
                padding: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                boxSizing: "border-box",
              }}
            >
              {!isRecording && !audioUrl && (
                <button
                  type="button"
                  onClick={startRecording}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    backgroundColor: "#cb808b",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    fontSize: "0.85rem",
                  }}
                >
                  🎙️ Pesan Suara
                </button>
              )}

              {isRecording && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#cb808b",
                        borderRadius: "50%",
                        animation: "pulse 1s infinite alternate",
                      }}
                    />
                    <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: "bold", color: "#162a40" }}>
                      {formatTime(recordingTime)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={stopRecording}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#cb808b",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    ⏹️ Selesai
                  </button>
                </div>
              )}

              {audioUrl && !isRecording && (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <audio src={audioUrl} controls preload="metadata" style={{ width: "100%", maxWidth: "260px" }} />
                  <button
                    type="button"
                    onClick={deleteRecording}
                    style={{
                      padding: "4px 12px",
                      backgroundColor: "transparent",
                      color: "#cb808b",
                      border: "1px solid #cb808b",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    🗑️ Hapus & Rekam Ulang
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 4. TOMBOL SUBMIT */}
          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "14px",
              backgroundColor: "#cb808b",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontFamily: "'Georgia', serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(203, 128, 139, 0.3)",
            }}
          >
            Kirim Pesan ➔
          </button>

          {/* 5. DAFTAR PESAN */}
          <MessageList refreshTrigger={refreshTrigger} />
        </form>

        <style>{`
          @keyframes pulse {
            from { opacity: 1; }
            to { opacity: 0.3; }
          }
        `}</style>
      </div>
    </>
  );
}