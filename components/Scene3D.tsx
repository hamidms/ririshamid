"use client";

import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  OrthographicCamera, 
  PerformanceMonitor, 
  BakeShadows 
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Dynamic / Lazy Import untuk setiap Model 3D
const BookModel = lazy(() => import("@/components/BookModel"));
const SunflowerModel = lazy(() => import("@/components/SunflowerModel"));
const ShoesModel = lazy(() => import("@/components/ShoesModel"));
const HeelsModel = lazy(() => import("@/components/HeelsModel"));
const HeadphoneModel = lazy(() => import("@/components/HeadphoneModel"));
const PhoneModel = lazy(() => import("@/components/PhoneModel"));
const CalendarModel = lazy(() => import("@/components/CalendarModel"));
const RingModel = lazy(() => import("@/components/RingModel"));
const GrassModel = lazy(() => import("@/components/GrassModel"));

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
  const [isTabActive, setIsTabActive] = useState(true);
  const [dpr, setDpr] = useState<number | [number, number]>([1, 1.5]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <Canvas
      dpr={dpr}
      frameloop={isTabActive ? "always" : "never"}
      gl={{ powerPreference: "high-performance", antialias: false }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr([1, 1.5])}
      />

      <BakeShadows />

      <OrthographicCamera
        makeDefault
        position={[8, 18, 10]}
        zoom={85}
        near={0.1}
        far={1000}
      />

      <ambientLight intensity={0.9} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} />

      {/* Suspense akan merender model secara bertahap saat kodenya selesai di-download */}
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
          <RingModel onSelect={() => setActiveModel("Ring")} />
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