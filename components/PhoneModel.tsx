import { useGLTF } from "@react-three/drei";

// Beritahu TypeScript bahwa komponen ini menerima prop fungsi onSelect
interface ModelProps {
  onSelect: () => void;
}

export default function PhoneModel({ onSelect }: ModelProps) {
  // Masukkan jalur file gltf/glb milikmu masing-masing
  const { scene } = useGLTF("/models/phone/Phone.glb");

  return (
    <primitive 
      object={scene} 
      scale={0.6}
      onClick={(e: any) => {
        // StopPropagation krusial agar klik tidak tembus ke rumput/model lain di belakangnya
        e.stopPropagation(); 
        onSelect();
      }}
      // Mengubah kursor mouse menjadi pointer tangan saat diarahkan ke objek
      onPointerOver={(e: any) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
      }}
      // Mengembalikan kursor mouse menjadi normal saat tidak menyentuh objek
      onPointerOut={(e: any) => {
        document.body.style.cursor = "auto";
      }}
    />
  );
}