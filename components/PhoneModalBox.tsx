"use client";

import React, { useState, useRef, useEffect } from "react";

interface PhoneModalBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

// ==========================================
// INTERFACE UNTUK DATA PESAN SUPABASE
// ==========================================
interface MessageData {
  id: number;
  pesan: string;
  kehadiran: string;
  jumlah_orang: number;
  audio_url: string;
  created_at: string;
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
  }, [refreshTrigger]); // Akan fetch ulang setiap kali refreshTrigger berubah

  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px 0", color: "#7a695e", fontFamily: "sans-serif", fontSize: "0.9rem" }}>Memuat ucapan...</div>;
  }

  if (messages.length === 0) {
    return <div style={{ textAlign: "center", padding: "20px 0", color: "#aba094", fontStyle: "italic", fontFamily: "sans-serif", fontSize: "0.85rem" }}>Belum ada ucapan yang tersimpan.</div>;
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <h3 style={{ 
        fontFamily: "'Georgia', serif", 
        fontSize: "1.4rem", 
        fontStyle: "italic", 
        color: "#4a3b32", 
        marginBottom: "16px",
        borderTop: "1px dashed rgba(74, 59, 50, 0.15)",
        paddingTop: "24px"
      }}>
        Ucapan & Voice Note Tamu
      </h3>
      
      {/* Grid Layout Layout Menggunakan Inline Style Flex / Block Responsif */}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "16px" 
      }}>
        {messages.map((item) => (
          <div 
            key={item.id} 
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e3dcce",
              boxShadow: "0 2px 8px rgba(74, 59, 50, 0.05)",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            {/* Bagian Atas Informasi Tamu */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                padding: "4px 8px",
                borderRadius: "6px",
                backgroundColor: item.kehadiran === "tidak-hadir" ? "rgba(214, 48, 49, 0.1)" : "rgba(74, 59, 50, 0.08)",
                color: item.kehadiran === "tidak-hadir" ? "#d63031" : "#4a3b32"
              }}>
                {item.kehadiran === "tidak-hadir" ? "❌ Absen" : `✅ Hadir (${item.jumlah_orang} Orang)`}
              </span>
              <span style={{ fontSize: "0.7rem", color: "#aba094", fontFamily: "sans-serif" }}>
                {new Date(item.created_at).toLocaleDateString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>

            {/* Konten Pesan */}
            <p style={{
              fontFamily: "sans-serif",
              fontSize: "0.9rem",
              color: "#3e3129",
              margin: 0,
              lineHeight: "1.4",
              whiteSpace: "pre-wrap",
              fontStyle: "italic"
            }}>
              "{item.pesan || "Tanpa pesan teks."}"
            </p>

            {/* Konten Audio VN jika tersedia */}
            {item.audio_url && (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingTop: "4px" }}>
                <span style={{ fontSize: "0.75rem", color: "#7a695e", fontFamily: "sans-serif", fontWeight: "bold" }}>🎙️ Voice Note:</span>
                <audio 
                  src={item.audio_url} 
                  controls 
                  style={{ width: "100%", height: "32px" }} 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN UTAMA: PHONE MODAL BOX
// ==========================================
export default function PhoneModalBox({ isOpen, onClose }: PhoneModalBoxProps) {
  if (!isOpen) return null;

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

  // Ref untuk menyimpan instance MediaRecorder & Timer
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Efek menghitung durasi saat merekam
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

  // Fungsi Mulai Merekam VN
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
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

  // Fungsi Berhenti Merekam
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Fungsi Menghapus Rekaman VN yang ada
  const deleteRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
  };

  // Format Detik ke Menit:Detik (00:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. HITUNG JUMLAH ORANG BERDASARKAN PILIHAN KEHADIRAN
    let jumlahOrang = 0;
    if (kehadiran === "datang-sendiri") {
      jumlahOrang = 1;
    } else if (kehadiran === "datang-berdua") {
      jumlahOrang = 2;
    }

    // 2. Buat wadah FormData
    const formData = new FormData();
    formData.append("pesan", pesan);
    formData.append("kehadiran", kehadiran);
    formData.append("jumlah_orang", jumlahOrang.toString());
    
    if (audioBlob) {
      const fileVN = new File([audioBlob], "voicenote.wav", { type: "audio/wav" });
      formData.append("voiceNote", fileVN);
    }

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Pesan dan Voice Note kamu berhasil dikirim ke Supabase! 🎉");
        
        // Reset inputan form
        setPesan("");
        deleteRecording();
        
        // Picu pembaruan sub-komponen MessageList secara instan
        setRefreshTrigger(prev => prev + 1);
      } else {
        alert(`Gagal mengirim: ${result.error}`);
      }
    } catch (error) {
      console.error("Kesalahan koneksi:", error);
      alert("Terjadi kesalahan jaringan.");
    }
  };

  return (
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
      backgroundImage: "linear-gradient(to right, rgba(74, 59, 50, 0.04) 1px, transparent 1px)",
      backgroundSize: "20px 100%",
      overflow: "hidden"
    }}>
      
      {/* HEADER AREA (FIXED - TIDAK IKUT KESCROLL) */}
      <div style={{
        padding: "25px 20px 15px 20px",
        position: "relative",
        borderBottom: "1px dashed rgba(74, 59, 50, 0.1)"
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "30px",
            height: "30px",
            backgroundColor: "#d63031",
            color: "white",
            border: "none",
            borderRadius: "50%",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
          }}
        >
          ✕
        </button>

        <h1 style={{ 
          fontFamily: "'Georgia', serif", 
          fontSize: "2.4rem", 
          fontStyle: "italic", 
          fontWeight: "normal", 
          color: "#4a3b32", 
          margin: 0 
        }}>
          Kirim Pesan
        </h1>
        
        <div style={{ 
          width: "100%", 
          height: "10px", 
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 12' width='100%25' height='12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 C150,12 150,0 300,6 C450,12 450,0 600,6 C750,12 750,0 900,6 C1050,12 1050,0 1200,6' fill='none' stroke='%234a3b32' stroke-width='2'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat-x", 
          margin: "8px 0 0 0"
        }} />
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
          WebkitOverflowScrolling: "touch"
        }}
      >
        {/* 1. INPUT TEXT: SILAKAN MASUKKAN PESAN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#4a3b32", fontSize: "1.1rem" }}>
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
              color: "#3e3129",
              boxSizing: "border-box",
              outline: "none"
            }}
          />
        </div>

        {/* 2. PILIHAN KEHADIRAN */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#4a3b32", fontSize: "1.1rem" }}>
            Konfirmasi Kehadiran:
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { id: "tidak-hadir", label: "Tidak bisa hadir" },
              { id: "datang-sendiri", label: "Datang sendiri" },
              { id: "datang-berdua", label: "Datang berdua" }
            ].map((option) => (
              <label key={option.id} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.95rem", color: "#5c4d42", fontFamily: "sans-serif", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="kehadiran"
                  value={option.id}
                  checked={kehadiran === option.id}
                  onChange={(e) => setKehadiran(e.target.value)}
                  style={{ accentColor: "#4a3b32", width: "18px", height: "18px" }}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* 3. MODUL PEREKAM VOICE NOTE INTERAKTIF */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontFamily: "'Georgia', serif", fontStyle: "italic", color: "#4a3b32", fontSize: "1.1rem" }}>
            Pesan Suara / Voice Note (Opsional):
          </label>
          
          <div style={{
            border: "1px dashed #c9bda7",
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            boxSizing: "border-box"
          }}>
            
            {!isRecording && !audioUrl && (
              <button
                type="button"
                onClick={startRecording}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  backgroundColor: "#1e56e3", 
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  fontSize: "0.85rem"
                }}
              >
                🎙️ Mulai Rekam VN
              </button>
            )}

            {isRecording && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{
                    width: "10px", height: "10px", backgroundColor: "#d63031", borderRadius: "50%",
                    animation: "pulse 1s infinite alternate"
                  }} />
                  <span style={{ fontFamily: "monospace", fontSize: "1.2rem", fontWeight: "bold", color: "#4a3b32" }}>
                    {formatTime(recordingTime)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={stopRecording}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#d63031",
                    color: "white",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: "bold"
                  }}
                >
                  ⏹️ Selesai
                </button>
              </div>
            )}

            {audioUrl && !isRecording && (
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <audio src={audioUrl} controls style={{ width: "100%", maxWidth: "260px" }} />
                <button
                  type="button"
                  onClick={deleteRecording}
                  style={{
                    padding: "4px 12px",
                    backgroundColor: "transparent",
                    color: "#d63031",
                    border: "1px solid #d63031",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: "500"
                  }}
                >
                  🗑️ Hapus & Rekam Ulang
                </button>
              </div>
            )}

          </div>
        </div>

        {/* 4. TOMBOL SUBMIT FORM */}
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "14px",
            backgroundColor: "#4a3b32", 
            color: "#fbf9f5",
            border: "none",
            borderRadius: "8px",
            fontFamily: "'Georgia', serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(74, 59, 50, 0.2)"
          }}
        >
          Kirim Pesan ➔
        </button>

        {/* 5. TAMPILAN SUB-KOMPONEN MESSAGE LIST (BERADA DI BAWAH SUBMIT) */}
        <MessageList refreshTrigger={refreshTrigger} />

      </form>

      <style>{`
        @keyframes pulse {
          from { opacity: 1; }
          to { opacity: 0.3; }
        }
      `}</style>

    </div>
  );
}