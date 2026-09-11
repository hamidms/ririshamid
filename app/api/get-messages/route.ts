import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Force Next.js agar tidak menggunakan cache statis saat mendeploy
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Ambil data dari tabel 'tamu' yang kolom 'pesan'-nya tidak NULL & tidak kosong
    const { data, error } = await supabase
      .from("tamu")
      .select("*")
      .not("pesan", "is", null)
      .neq("pesan", "")
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Gagal mengambil data:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}