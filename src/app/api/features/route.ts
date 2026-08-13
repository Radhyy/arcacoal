import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch Features Section Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM features_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No features content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching Features content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update Features Section Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const sourceLanguage = body.sourceLanguage || "id"; // "id" or "en"
    const item_number = body.item_number || "01.";

    let badge_id = body.badge_id || "";
    let badge_en = body.badge_en || "";
    let header_title_id = body.header_title_id || "";
    let header_title_en = body.header_title_en || "";
    let header_subtitle_id = body.header_subtitle_id || "";
    let header_subtitle_en = body.header_subtitle_en || "";
    let item_title_id = body.item_title_id || "";
    let item_title_en = body.item_title_en || "";
    let item_subtitle_id = body.item_subtitle_id || "";
    let item_subtitle_en = body.item_subtitle_en || "";
    let item_description_id = body.item_description_id || "";
    let item_description_en = body.item_description_en || "";
    let badge1_id = body.badge1_id || "";
    let badge1_en = body.badge1_en || "";
    let badge2_id = body.badge2_id || "";
    let badge2_en = body.badge2_en || "";
    let badge3_id = body.badge3_id || "";
    let badge3_en = body.badge3_en || "";
    let badge4_id = body.badge4_id || "";
    let badge4_en = body.badge4_en || "";

    if (sourceLanguage === "id") {
      console.log("Translating Features section from ID -> EN via Groq AI...");
      [
        badge_en,
        header_title_en,
        header_subtitle_en,
        item_title_en,
        item_subtitle_en,
        item_description_en,
        badge1_en,
        badge2_en,
        badge3_en,
        badge4_en,
      ] = await Promise.all([
        translateText(badge_id, "en"),
        translateText(header_title_id, "en"),
        translateText(header_subtitle_id, "en"),
        translateText(item_title_id, "en"),
        translateText(item_subtitle_id, "en"),
        translateText(item_description_id, "en"),
        translateText(badge1_id, "en"),
        translateText(badge2_id, "en"),
        translateText(badge3_id, "en"),
        translateText(badge4_id, "en"),
      ]);
    } else {
      console.log("Translating Features section from EN -> ID via Groq AI...");
      [
        badge_id,
        header_title_id,
        header_subtitle_id,
        item_title_id,
        item_subtitle_id,
        item_description_id,
        badge1_id,
        badge2_id,
        badge3_id,
        badge4_id,
      ] = await Promise.all([
        translateText(badge_en, "id"),
        translateText(header_title_en, "id"),
        translateText(header_subtitle_en, "id"),
        translateText(item_title_en, "id"),
        translateText(item_subtitle_en, "id"),
        translateText(item_description_en, "id"),
        translateText(badge1_en, "id"),
        translateText(badge2_en, "id"),
        translateText(badge3_en, "id"),
        translateText(badge4_en, "id"),
      ]);
    }

    const updatedRows = await sql`
      UPDATE features_content
      SET
        badge_id = ${badge_id},
        badge_en = ${badge_en},
        header_title_id = ${header_title_id},
        header_title_en = ${header_title_en},
        header_subtitle_id = ${header_subtitle_id},
        header_subtitle_en = ${header_subtitle_en},
        item_number = ${item_number},
        item_title_id = ${item_title_id},
        item_title_en = ${item_title_en},
        item_subtitle_id = ${item_subtitle_id},
        item_subtitle_en = ${item_subtitle_en},
        item_description_id = ${item_description_id},
        item_description_en = ${item_description_en},
        badge1_id = ${badge1_id},
        badge1_en = ${badge1_en},
        badge2_id = ${badge2_id},
        badge2_en = ${badge2_en},
        badge3_id = ${badge3_id},
        badge3_en = ${badge3_en},
        badge4_id = ${badge4_id},
        badge4_en = ${badge4_en},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten Keunggulan Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating Features content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
