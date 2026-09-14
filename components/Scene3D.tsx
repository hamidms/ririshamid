"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import BookModel from "@/components/BookModel";
import SunflowerModel from "@/components/SunflowerModel";
import ShoesModel from "@/components/ShoesModel";
import HeelsModel from "@/components/HeelsModel";
import HeadphoneModel from "@/components/HeadphoneModel";
import PhoneModel from "@/components/PhoneModel";
import CalendarModel from "@/components/CalendarModel";
import RingModel from "@/components/RingModel";
import GrassModel from "@/components/GrassModel";

interface Scene3DProps {
  setActiveModel: (model: string | null) => void;
  handleOpenPhoneModal: () => void;
  setIsGiftOpen: (open: boolean) => void;
  setIsInteracting: (interacting: boolean) => void;
}

function SmoothOrbitControls({
  shouldRotate,
  onStart,
  onEnd,
}: {
  shouldRotate: boolean;
  onStart: () => void;
  onEnd: () => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const TARGET_SPEED = 0.5;
  const currentSpeedRef = useRef(0);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    const target = shouldRotate ? TARGET_SPEED : 0;
    currentSpeedRef.current += (target - currentSpeedRef.current) * (delta * 2.0);

    controlsRef.current.autoRotateSpeed = currentSpeedRef.current;
    controlsRef.current.autoRotate = currentSpeedRef.current > 0.001;
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.15}
      minZoom={50}
      maxZoom={250}
      target={[0, -1.2, 0]}
      maxPolarAngle={Math.PI / 2.5}
      minPolarAngle={Math.PI / 6}
      onStart={onStart}
      onEnd={onEnd}
    />
  );
}

export default function Scene3D({
  setActiveModel,
  handleOpenPhoneModal,
  setIsGiftOpen,
  setIsInteracting,
}: Scene3DProps) {
  const [shouldRotate, setShouldRotate] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true); // State untuk mendeteksi status tab
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Efek untuk mendeteksi apakah tab sedang dibuka atau ditinggalkan
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleStart = () => {
    setShouldRotate(false);
    setIsInteracting(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleEnd = () => {
    setIsInteracting(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShouldRotate(true);
    }, 5000);
  };

  return (
    /* frameloop="never" akan mematikan render loop & rotasi saat tab tidak aktif */
    <Canvas frameloop={isTabActive ? "always" : "never"}>
      <OrthographicCamera
        makeDefault
        position={[8, 18, 10]}
        zoom={85}
        near={0.1}
        far={1000}
      />

      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} />

      <Suspense fallback={null}>
        <group position={[0, -3, 0]}>
          <GrassModel />
        </group>

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
          <PhoneModel onSelect={handleOpenPhoneModal} />
        </group>

        <group position={[0, -2.4, -1.2]}>
          <SunflowerModel
            onSelect={() => {
              setActiveModel("Tanaman Bunga Matahari");
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

      <SmoothOrbitControls
        shouldRotate={shouldRotate}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    </Canvas>
  );
}