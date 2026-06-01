"use client";

import { useState } from "react";
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

export default function Home() {
  const [activeModel, setActiveModel] = useState<string | null>(null);

  return (
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

          <group position={[1.8, -2.2, 0.5]} rotation={[Math.PI / 2, 3, Math.PI / 3]}>
            <PhoneModel onSelect={() => setActiveModel("Phone")} />
          </group>

          <group position={[0, -2.4, -1.2]}>
            <SunflowerModel onSelect={() => setActiveModel("Tanaman Bunga Matahari")} />
          </group>

          <group position={[-1, -2, 0.5]} rotation={[0, 0, 1.5]}>
            <HeadphoneModel onSelect={() => setActiveModel("Headphone Audio Pro")} />
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

      <PhoneModalBox 
        isOpen={activeModel === "Phone"} 
        onClose={() => setActiveModel(null)} 
      />

      {/* DEFAULT POPUP UTK OBJEK SELAIN KALENDER (Jika Masih Perlu) */}
      {activeModel && activeModel !== "Calendar" && (
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
      )}
    </main>
  );
}