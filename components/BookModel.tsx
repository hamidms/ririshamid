import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function BookModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/medieval_fantasy_book/Book.glb"); // Sesuaikan folder model bukumu

  return (
    <primitive 
      object={scene} 
      scale={0.9}
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