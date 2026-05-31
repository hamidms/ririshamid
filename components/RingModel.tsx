import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function RingModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/ring/scene.gltf"); // Sesuaikan folder cincinmu

  return (
    <primitive 
      object={scene} 
      scale={0.8}
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