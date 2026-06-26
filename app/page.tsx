"use client";

import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Suspense } from "react";

import BookModel from "@/components/BookModel";
import SunflowerModel from "@/components/SunflowerModel";
import ShoesModel from "@/components/ShoesModel";
import HeelsModel from "@/components/HeelsModel";
import HeadphoneModel from "@/components/HeadphoneModel";
import PhoneModel from "@/components/PhoneModel";
import CalendarModel from "@/components/CalendarModel";
import RingModel from "@/components/RingModel";
import GrassModel from "@/components/GrassModel";

import CalendarModalBox from "@/components/CalendarModalBox";
import BookModalBox from "@/components/BookModalBox";
import PhoneModalBox from "@/components/PhoneModalBox";
import CoupleModalBox from "@/components/CoupleModalBox";
import GiftModalBox from "@/components/GiftModalBox";
import HeadphoneModalBox from "@/components/AudioModalBox";
import AudioModalBox from "@/components/AudioModalBox";
import WeddingCover from "@/components/WeddingCover";
import LoadingScreen from "@/components/LoadingScreen";


export default function Home() {
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [wasPlayingBeforeModal, setWasPlayingBeforeModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State baru untuk loading screen
  const [isFadingOut, setIsFadingOut] = useState(false); // State baru untuk efek memudar



  // Perbaikan Fungsi ketika tombol "Buka Undangan" diklik di Cover halaman
  const handleOpenInvitation = () => {
    setIsCoverOpen(false); // 1. Tutup cover halaman halaman depan
    setIsLoading(true);    // 2. Aktifkan loading screen tutorial

    // 3. Langsung mainkan musik latar secara halus begitu undangan dibuka!
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          fadeInAudio(); // Musik berangsur membesar di latar belakang loading
        })
        .catch((err) => console.log("Autoplay blocked:", err));
    }

    // 4. Setelah 2 detik (2000ms), jalankan efek memudar perlahan
    setTimeout(() => {
      setIsFadingOut(true); // Memicu opacity CSS LoadingScreen bergerak ke 0

      // 5. Beri jeda 0.8 detik (800ms) menunggu animasi transisi selesai, baru lepas dari DOM
      setTimeout(() => {
        setIsLoading(false);
        setIsFadingOut(false); // Reset kembali state transisi ke kondisi awal
      }, 800); // Durasi ini wajib sinkron dengan transition: "opacity 0.8s" di LoadingScreen

    }, 2000); // Waktu tunggu loading utama (2 detik)
  };

  // Mengupdate progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  // Perbaikan Fungsi Play / Pause global
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // 1. Panggil fungsi fade out terlebih dahulu
        fadeOutAudio(() => {
          // State isPlaying baru diubah menjadi false SETELAH volume benar-benar 0 dan audio ter-pause
          setIsPlaying(false);
        });
      } else {
        // 2. Jika statusnya sedang pause, langsung set isPlaying menjadi true
        setIsPlaying(true);
        
        audioRef.current.volume = 0; // Reset ke sunyi sebelum mulai jalan
        audioRef.current.play()
          .then(() => {
            fadeInAudio(); // Panggil efek fade in secara bertahap
          })
          .catch((err) => {
            console.log("Gagal memutar audio:", err);
            setIsPlaying(false); // Kembalikan ke false jika diblokir browser
          });
      }
    }
  };

  const fadeInAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0; // Mulai dari sunyi
      let vol = 0;
      
      const interval = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          vol += 0.05; // Naikkan volume bertahap
          if (vol >= 1) {
            audioRef.current.volume = 1; // Maksimal volume (100%)
            clearInterval(interval);
          } else {
            audioRef.current.volume = vol;
          }
        } else {
          // Jika di-pause saat proses fade-in berlangsung, hentikan interval
          clearInterval(interval);
        }
      }, 75); // Berjalan setiap 75ms (total ~1.5 detik untuk mencapai volume penuh)
    }
  };

  // Fungsi untuk menurunkan volume secara bertahap dari posisi saat ini ke 0 selama ~0.4 detik, baru di-pause
  const fadeOutAudio = (callback: () => void) => {
    if (audioRef.current) {
      let vol = audioRef.current.volume;
      
      const interval = setInterval(() => {
        if (audioRef.current && !audioRef.current.paused) {
          vol -= 0.1; // Turunkan volume dengan cepat tapi tetap halus
          if (vol <= 0) {
            audioRef.current.volume = 0;
            audioRef.current.pause(); // BARU DI-PAUSE SETELAH SUNYI
            clearInterval(interval);
            callback(); // Menjalankan fungsi ganti state isPlaying jadi false
          } else {
            audioRef.current.volume = vol;
          }
        } else {
          clearInterval(interval);
        }
      }, 40); // Berjalan cepat tiap 40ms biar fade-out terasa pas (tidak terlalu lama menunda pause)
    } else {
      callback();
    }
  };

  // Perbaikan Fungsi saat tombol Phone diklik untuk membuka modal
  const handleOpenPhoneModal = () => {
    // 1. Simpan status terakhir: apakah musik lagi jalan atau tidak?
    setWasPlayingBeforeModal(isPlaying);
    
    // 2. Jika musik lagi jalan, jalankan fade out terlebih dahulu
    if (isPlaying && audioRef.current) {
      fadeOutAudio(() => {
        // Kode di dalam blok ini baru berjalan SETELAH volume lagu menyentuh 0 dan lagu ter-pause
        setIsPlaying(false);
        setActiveModel("Phone"); // Modal baru terbuka setelah suara mengecil halus
      });
    } else {
      // 3. Jika musik memang sedang mati/pause, langsung buka modal dengan aman
      setActiveModel("Phone");
    }
  };

  // 2. Fungsi saat modal Phone ditutup (onClose)
  const handleClosePhoneModal = () => {
    // Tutup modal terlebih dahulu
    setActiveModel(null);
    
    // Cek catatan kita: Jika sebelum modal dibuka musiknya jalan, maka mainkan lagi
    if (wasPlayingBeforeModal && audioRef.current) {
      audioRef.current.volume = 0; // Reset ke sunyi dulu
      audioRef.current.play()
        .then(() => {
          fadeInAudio(); // Musik berlanjut dengan efek halus!
        })
        .catch((err) => console.log(err));
      setIsPlaying(true);
    }
    
    // Reset kembali state pengingatnya
    setWasPlayingBeforeModal(false);
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
    
{/* ALUR KONDISIONAL LAYER SEBELUM UTAMA
    {isCoverOpen ? (
      <WeddingCover onOpen={handleOpenInvitation} />
    ) : isLoading ? (
      <LoadingScreen /> // Muncul selama 2 detik mengalir ke bawah dengan bar animasi
    ) : (
        <>
       */}

      {/* 1. Element Audio diletakkan di luar <main> */}
      <audio 
        ref={audioRef}
        src="/audio/taruh.mp3" 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <main style={{ width: "100vw", height: "100vh", backgroundColor: "#afafaf", position: "relative" }}>
        <Canvas>
          <OrthographicCamera makeDefault position={[12, 12, 12]} zoom={110} near={0.1} far={1000} />
          
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 15, 10]} intensity={1.8} />

          <Suspense fallback={null}>
            
            <group position={[0, -3, 0]}>
              <GrassModel />
            </group>

            {/* Mengirimkan fungsi pop-up unik ke tiap model */}
            <group position={[0.1, -2, 0.2]} rotation={[0, 1.5, 0]}>
              <ShoesModel onSelect={() => setActiveModel("Couple")} />
            </group>

            <group position={[-1, -2.3, 0.2]} rotation={[0, -0.4, 0]}>
              <HeelsModel onSelect={() => setActiveModel("Couple")} />
            </group>

            <group position={[1.8, -2, -1]} rotation={[0, -0.5, 0]}>
              <BookModel onSelect={() => setActiveModel("Book")} />
            </group>

            {/* <group position={[1.8, -2.2, 0.5]} rotation={[Math.PI / 2, 3, Math.PI / 3]}>
              <PhoneModel onSelect={() => setActiveModel("Phone")} />
            </group> */}

            <group position={[1.8, -2.2, 0.5]} rotation={[Math.PI / 2, 3, Math.PI / 3]}>
              {/* Menggunakan fungsi handler khusus untuk mendeteksi status musik sebelum dibuka */}
              <PhoneModel onSelect={handleOpenPhoneModal} />
            </group>

            {/* <group position={[0, -2.4, -1.2]}>
              <SunflowerModel onSelect={() => setActiveModel("Tanaman Bunga Matahari")} />
            </group> */}

            {/* GROUP MODEL 3D KAMU */}
            <group position={[0, -2.4, -1.2]}>
              <SunflowerModel 
                onSelect={() => {
                  // A. Jalankan fungsi bawaan kamu jika ada
                  setActiveModel("Tanaman Bunga Matahari"); 
                  
                  // B. LANGSUNG TRIGGERS MODAL UNTUK MUNCUL DI SINI
                  setIsGiftOpen(true); 
                }} 
              />
            </group>

            <group position={[-1, -2, 0.5]} rotation={[0, 0, 1.5]}>
              <HeadphoneModel onSelect={() => setActiveModel("Headphone")} />
            </group>

            <group position={[-2, -2.3, 1.5]} rotation={[0, 1, 0]}>
              <CalendarModel onSelect={() => setActiveModel("Calendar")} />
            </group>

            <group position={[0.4, -2.3, 1]} rotation={[0, 0, 0]}>
              <RingModel onSelect={() => setActiveModel("Cincin Aksesoris Emas")} />
            </group>

          </Suspense>

          <OrbitControls 
            enableDamping 
            dampingFactor={0.15}
            minZoom={50}
            maxZoom={250}
            maxPolarAngle={Math.PI / 1} 
          />
        </Canvas>

        
      </main>

{/* PANGGIL MODAL SEPARASI DI SINI */}
      <CoupleModalBox 
        isOpen={activeModel === "Couple"} 
        onClose={() => setActiveModel(null)} 
      />

      <CalendarModalBox 
        isOpen={activeModel === "Calendar"} 
        onClose={() => setActiveModel(null)} 
      />

      <BookModalBox 
        isOpen={activeModel === "Book"} 
        onClose={() => setActiveModel(null)} 
      />

      {/* <PhoneModalBox 
        isOpen={activeModel === "Phone"} 
        onClose={() => setActiveModel(null)} 
      /> */}

      <PhoneModalBox 
        isOpen={activeModel === "Phone"} 
        onClose={handleClosePhoneModal} // Menggunakan fungsi handle khusus kita
      />

      <HeadphoneModalBox 
        isOpen={activeModel === "Headphone"}
        onClose={() => setActiveModel(null)} isPlaying={false} togglePlay={function (): void {
          throw new Error("Function not implemented.");
        } } progress={0}        />

      <GiftModalBox isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />

      {/* DEFAULT POPUP UTK OBJEK SELAIN KALENDER (Jika Masih Perlu) */}
      {/* {activeModel && activeModel !== "Calendar" && (
        console.log("Active Model:", activeModel), // Debugging: Log model yang aktif
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: "85vw", maxWidth: "1000px", height: "80vh", maxHeight: "600px",
          backgroundColor: "#fbf9f5", color: "#333", padding: "40px", borderRadius: "16px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)", zIndex: 100
        }}>
          <button onClick={() => setActiveModel(null)} style={{ position: "absolute", top: "20px", right: "20px", cursor: "pointer" }}>✕</button>
          <h1>Detail Objek: {activeModel}</h1>
        </div>
      )} */}
        {/* 3. Modal Box juga di luar <main> karena sifatnya floating/overlay */}
      <AudioModalBox 
        isOpen={activeModel === "Headphone"} 
        onClose={() => setActiveModel(null)} 
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        progress={progress}
      />

      {/* ========================================================= */}
      {/* LAYER 3 (ATAS): LOADING OVERLAY SCREEN                    */}
      {/* Hanya muncul saat isLoading bernilai true                 */}
      {/* ========================================================= */}
      {isLoading && (
        <LoadingScreen isFadingOut={isFadingOut} />
      )}


      {/* ========================================================= */}
      {/* LAYER 4 (PALING ATAS): WEDDING COVER GATE                */}
      {/* Menutup seluruh layar pertama kali sebelum diklik         */}
      {/* ========================================================= */}
      {isCoverOpen && <WeddingCover onOpen={handleOpenInvitation} />}

      {/* )} */}
    </div>
  );
}
