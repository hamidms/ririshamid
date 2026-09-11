import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    // 1. Ambil data FormData dari request
    const formData = await request.formData();
    const namaTamu = formData.get("nama_tamu") as string;
    const pesan = formData.get("pesan") as string;
    const kehadiran = formData.get("kehadiran") as string;
    const jumlahOrang = parseInt(formData.get("jumlah_orang") as string) || 0;
    const fileAudio = formData.get("voiceNote") as File | null;

    if (!namaTamu) {
      return NextResponse.json(
        { success: false, error: "Nama tamu tidak boleh kosong." },
        { status: 400 }
      );
    }

    let audioUrl = "";

    // 2. Jika user merekam Voice Note, unggah ke Supabase Storage ('voice-notes')
    if (fileAudio) {
      const ext = fileAudio.name.split(".").pop() || "webm";
      const fileName = `vn_${Date.now()}_${namaTamu.replace(/\s+/g, "_")}.${ext}`;

      const { error: storageError } = await supabase.storage
        .from("voice-notes")
        .upload(fileName, fileAudio, {
          contentType: fileAudio.type || "audio/webm",
          cacheControl: "3600",
          upsert: true,
        });

      if (storageError) {
        throw new Error(`Gagal upload audio: ${storageError.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("voice-notes")
        .getPublicUrl(fileName);

      audioUrl = publicUrlData.publicUrl;
    }

    // 3. Susun payload data untuk tabel 'tamu'
    const payload: Record<string, any> = {
      nama: namaTamu,
      pesan: pesan,
      kehadiran: kehadiran,
      jumlah_orang: jumlahOrang,
      updated_at: new Date().toISOString(),
    };

    if (audioUrl) {
      payload.audio_url = audioUrl;
    }

    // 4. Lakukan UPSERT ke tabel 'tamu' berdasarkan kolom 'nama'
    const { error: dbError } = await supabase
      .from("tamu")
      .upsert(payload, { onConflict: "nama" });

    if (dbError) {
      throw new Error(`Gagal simpan ke database: ${dbError.message}`);
    }

    return NextResponse.json({
      success: true,
      message: "Data RSVP berhasil disimpan!",
    });
  } catch (error: any) {
    console.error("Supabase Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}