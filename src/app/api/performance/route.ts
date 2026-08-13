import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch Performance Highlights Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM performance_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No performance content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching Performance content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update Performance Highlights Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const sourceLanguage = body.sourceLanguage || "id"; // "id" or "en"

    let badge_id = body.badge_id || "";
    let badge_en = body.badge_en || "";
    let header_title_id = body.header_title_id || "";
    let header_title_en = body.header_title_en || "";
    let header_subtitle_id = body.header_subtitle_id || "";
    let header_subtitle_en = body.header_subtitle_en || "";

    let item1_title_id = body.item1_title_id || "";
    let item1_title_en = body.item1_title_en || "";
    let item1_badge_id = body.item1_badge_id || "";
    let item1_badge_en = body.item1_badge_en || "";
    let item1_desc_id = body.item1_desc_id || "";
    let item1_desc_en = body.item1_desc_en || "";

    let item2_title_id = body.item2_title_id || "";
    let item2_title_en = body.item2_title_en || "";
    let item2_badge_id = body.item2_badge_id || "";
    let item2_badge_en = body.item2_badge_en || "";
    let item2_desc_id = body.item2_desc_id || "";
    let item2_desc_en = body.item2_desc_en || "";

    let item3_title_id = body.item3_title_id || "";
    let item3_title_en = body.item3_title_en || "";
    let item3_badge_id = body.item3_badge_id || "";
    let item3_badge_en = body.item3_badge_en || "";
    let item3_desc_id = body.item3_desc_id || "";
    let item3_desc_en = body.item3_desc_en || "";

    let item4_title_id = body.item4_title_id || "";
    let item4_title_en = body.item4_title_en || "";
    let item4_badge_id = body.item4_badge_id || "";
    let item4_badge_en = body.item4_badge_en || "";
    let item4_desc_id = body.item4_desc_id || "";
    let item4_desc_en = body.item4_desc_en || "";

    if (sourceLanguage === "id") {
      console.log("Translating Performance section from ID -> EN via Groq AI...");
      [
        badge_en,
        header_title_en,
        header_subtitle_en,
        item1_title_en,
        item1_badge_en,
        item1_desc_en,
        item2_title_en,
        item2_badge_en,
        item2_desc_en,
        item3_title_en,
        item3_badge_en,
        item3_desc_en,
        item4_title_en,
        item4_badge_en,
        item4_desc_en,
      ] = await Promise.all([
        translateText(badge_id, "en"),
        translateText(header_title_id, "en"),
        translateText(header_subtitle_id, "en"),
        translateText(item1_title_id, "en"),
        translateText(item1_badge_id, "en"),
        translateText(item1_desc_id, "en"),
        translateText(item2_title_id, "en"),
        translateText(item2_badge_id, "en"),
        translateText(item2_desc_id, "en"),
        translateText(item3_title_id, "en"),
        translateText(item3_badge_id, "en"),
        translateText(item3_desc_id, "en"),
        translateText(item4_title_id, "en"),
        translateText(item4_badge_id, "en"),
        translateText(item4_desc_id, "en"),
      ]);
    } else {
      console.log("Translating Performance section from EN -> ID via Groq AI...");
      [
        badge_id,
        header_title_id,
        header_subtitle_id,
        item1_title_id,
        item1_badge_id,
        item1_desc_id,
        item2_title_id,
        item2_badge_id,
        item2_desc_id,
        item3_title_id,
        item3_badge_id,
        item3_desc_id,
        item4_title_id,
        item4_badge_id,
        item4_desc_id,
      ] = await Promise.all([
        translateText(badge_en, "id"),
        translateText(header_title_en, "id"),
        translateText(header_subtitle_en, "id"),
        translateText(item1_title_en, "id"),
        translateText(item1_badge_en, "id"),
        translateText(item1_desc_en, "id"),
        translateText(item2_title_en, "id"),
        translateText(item2_badge_en, "id"),
        translateText(item2_desc_en, "id"),
        translateText(item3_title_id, "id"),
        translateText(item3_badge_id, "id"),
        translateText(item3_desc_id, "id"),
        translateText(item4_title_id, "id"),
        translateText(item4_badge_id, "id"),
        translateText(item4_desc_id, "id"),
      ]);
    }

    const updatedRows = await sql`
      UPDATE performance_content
      SET
        badge_id = ${badge_id},
        badge_en = ${badge_en},
        header_title_id = ${header_title_id},
        header_title_en = ${header_title_en},
        header_subtitle_id = ${header_subtitle_id},
        header_subtitle_en = ${header_subtitle_en},

        item1_title_id = ${item1_title_id},
        item1_title_en = ${item1_title_en},
        item1_badge_id = ${item1_badge_id},
        item1_badge_en = ${item1_badge_en},
        item1_desc_id = ${item1_desc_id},
        item1_desc_en = ${item1_desc_en},

        item2_title_id = ${item2_title_id},
        item2_title_en = ${item2_title_en},
        item2_badge_id = ${item2_badge_id},
        item2_badge_en = ${item2_badge_en},
        item2_desc_id = ${item2_desc_id},
        item2_desc_en = ${item2_desc_en},

        item3_title_id = ${item3_title_id},
        item3_title_en = ${item3_title_en},
        item3_badge_id = ${item3_badge_id},
        item3_badge_en = ${item3_badge_en},
        item3_desc_id = ${item3_desc_id},
        item3_desc_en = ${item3_desc_en},

        item4_title_id = ${item4_title_id},
        item4_title_en = ${item4_title_en},
        item4_badge_id = ${item4_badge_id},
        item4_badge_en = ${item4_badge_en},
        item4_desc_id = ${item4_desc_id},
        item4_desc_en = ${item4_desc_en},

        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten Performa Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating Performance content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
