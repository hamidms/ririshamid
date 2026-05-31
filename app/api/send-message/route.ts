import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    // 1. Ambil data FormData dari request
    const formData = await request.formData();
    const pesan = formData.get("pesan") as string;
    const kehadiran = formData.get("kehadiran") as string;
    const jumlahOrang = parseInt(formData.get("jumlah_orang") as string) || 0;
    const fileAudio = formData.get("voiceNote") as File | null;

    let audioUrl = "";

    // 2. Jika user merekam Voice Note, unggah ke Supabase Storage terlebih dahulu
    if (fileAudio) {
      // Buat nama file unik agar tidak saling tertimpa
      const fileName = `vn_${Date.now()}.wav`;

      // Unggah file mentah ke bucket 'voicenotes'
      const { data: storageData, error: storageError } = await supabase.storage
        .from("voicenotes")
        .upload(fileName, fileAudio, {
          contentType: "audio/wav",
          cacheControl: "3600",
        });

      if (storageError) {
        throw new Error(`Gagal upload audio: ${storageError.message}`);
      }

      // Ambil Link URL Publik dari file audio yang barusan diunggah
      const { data: publicUrlData } = supabase.storage
        .from("voicenotes")
        .getPublicUrl(fileName);

      audioUrl = publicUrlData.publicUrl;
    }

    // 3. Masukkan data teks beserta link audio ke tabel 'pesan_rsvp'
    const { error: dbError } = await supabase
      .from("pesan_rsvp")
      .insert([
        { 
          pesan: pesan, 
          kehadiran: kehadiran, 
          jumlah_orang: jumlahOrang,
          audio_url: audioUrl // Berisi string kosong jika tidak ada VN
        }
      ]);

    if (dbError) {
      throw new Error(`Gagal simpan ke database: ${dbError.message}`);
    }

    return NextResponse.json({ success: true, message: "Data berhasil disimpan ke Supabase!" });
  } catch (error: any) {
    console.error("Supabase Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}