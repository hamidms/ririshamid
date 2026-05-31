import { useGLTF } from "@react-three/drei";

interface ModelProps {
  onSelect: () => void;
}

export default function CalendarModel({ onSelect }: ModelProps) {
  const { scene } = useGLTF("/models/calendar/scene.gltf"); // Sesuaikan folder kalendermu

  return (
    <primitive 
      object={scene} 
      scale={16}
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