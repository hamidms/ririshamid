"use client";

import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  onSelect: () => void;
}

export default function CalendarModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/calendar/Calendar.glb"); // Sesuaikan folder model kalendermu

  return (
    <group
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
    >
      {/* Model utama Kalender */}
      <primitive object={scene} scale={1} />

      {/* 1. LINGKARAN MERAH TANGGAL 15 (Sumbu X geser ke kiri) */}
      <mesh
        position={[-0.45, 0.2, 0.01]} // Ubah angka -0.45 jika perlu geser horizontal ke 15
        rotation={[0, 0, 0]} 
      >
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#8b0000" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. LINGKARAN MERAH TANGGAL 18 (Sumbu X geser ke kanan) */}
      <mesh
        position={[0.45, 0.2, 0.01]} // Ubah angka 0.45 jika perlu geser horizontal ke 18
        rotation={[0, 0, 0]} 
      >
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#8b0000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}