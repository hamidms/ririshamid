"use client";

import { useEffect, useState } from "react";

interface MessageData {
  id: number;
  pesan: string;
  kehadiran: string;
  jumlah_orang: number;
  audio_url: string;
  created_at: string;
}

export default function MessageList() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data dari API internal Next.js
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

  useEffect(() => {
    fetchMessages();
    
    // Opsional: Cek data berkala setiap 10 detik agar list terupdate otomatis
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Memuat ucapan...</div>;
  }

  if (messages.length === 0) {
    return <div className="text-center py-4 text-gray-400 italic">Belum ada ucapan yang tersimpan.</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">Ucapan & Voice Note Tamu</h3>
      
      {/* Container Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {messages.map((item) => (
          <div 
            key={item.id} 
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            {/* Bagian Atas: Isi Teks Pesan */}
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                  {item.kehadiran === "tidak-hadir" ? "❌ Absen" : `✅ Hadir (${item.jumlah_orang} orang)`}
                </span>
                <span className="text-[10px] text-gray-400">
                  {new Date(item.created_at).toLocaleDateString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
              
              {/* Sesuai Request: Teks Pesan Terlebih Dahulu */}
              <p className="text-gray-700 text-sm whitespace-pre-wrap italic">
                "{item.pesan || "Tanpa pesan teks."}"
              </p>
            </div>

            {/* Bagian Bawah: Audio Playback (Jika ada Voice Note) */}
            {item.audio_url && (
              <div className="mt-auto pt-2 border-t border-gray-50">
                <p className="text-[11px] text-gray-400 mb-1 font-medium">🎙️ Voice Note:</p>
                <audio 
                  src={item.audio_url} 
                  controls 
                  className="w-full h-8 scale-95 origin-left"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}