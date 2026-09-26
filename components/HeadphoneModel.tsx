import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function HeadphoneModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/headphone/Headphone.glb"); // Sesuaikan folder model headphone-mu

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