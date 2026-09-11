"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  onSelect: () => void;
}

export default function CalendarModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/calendar/scene.gltf");

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
      <primitive object={scene} scale={16} />

      {/* Lingkaran Merah untuk Tanggal 15 */}
      <mesh
        // Sesuaikan koordinat position [X, Y, Z] dengan posisi angka 15 di model 3D kamu
        position={[0, 0.2, 0.01]} 
        // Sesuaikan rotation [X, Y, Z] agar sejajar dengan bidang kemiringan kalender
        rotation={[0, 0, 0]} 
      >
        {/* RingGeometry(innerRadius, outerRadius, thetaSegments) */}
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="#ff0000" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}