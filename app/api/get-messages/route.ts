import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Force Next.js agar tidak menggunakan cache statis saat mendeploy
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Mengambil data dan mengurutkannya dari yang paling baru (created_at desc)
    const { data, error } = await supabase
      .from("pesan_rsvp")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Gagal mengambil data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}