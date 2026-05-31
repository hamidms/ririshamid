import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function HeelsModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/heels/scene.gltf");

  return (
    <primitive 
      object={scene} 
      scale={6}
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