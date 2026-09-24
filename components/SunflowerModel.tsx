import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function SunflowerModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/sunflower/Bouquet.glb"); // Sesuaikan folder model bunga mataharimu

  return (
    <primitive 
      object={scene} 
      scale={0.7}
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