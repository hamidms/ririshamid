"use client";

import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function CalendarModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/calendar/Calendar.glb"); // Sesuaikan folder model kalendermu

  return (
    <primitive 
      object={scene} 
      scale={4}s
      onClick={(e: any) => {
        e.stopPropagation(); 
        onSelect();
      }}
      onPointerOver={(e: any) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={(e: any) => {
        document.body.style.cursor = "auto";
      }}
    />
  );
}