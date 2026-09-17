"use client";

import { useGLTF } from "@react-three/drei";

export default function GrassModel() {
  // Path diarahkan langsung ke folder public (tanpa menulis kata public-nya)
  const { scene } = useGLTF("/models/grass/Picnic_Board.glb");
  
  return (
    <primitive 
      object={scene} 
      scale={3} // Sesuaikan skalanya nanti kalau kebesaran/kekecilan
    />
  );
}

useGLTF.preload("/models/grass/Picnic_Board.glb");