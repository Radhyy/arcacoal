import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch Gallery Section Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM gallery_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No gallery content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching Gallery content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update Gallery Section Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
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
    let btn_text_id = body.btn_text_id || "";
    let btn_text_en = body.btn_text_en || "";

    let photos_json = Array.isArray(body.photos_json) ? body.photos_json : [];

    if (sourceLanguage === "id") {
      console.log("Translating Gallery section from ID -> EN via Groq AI...");
      [badge_en, header_title_en, header_subtitle_en, btn_text_en] = await Promise.all([
        translateText(badge_id, "en"),
        translateText(header_title_id, "en"),
        translateText(header_subtitle_id, "en"),
        translateText(btn_text_id, "en"),
      ]);

      // Translate photos array items
      photos_json = await Promise.all(
        photos_json.map(async (photo: any) => {
          const translatedTitleEn = photo.title_id ? await translateText(photo.title_id, "en") : (photo.title_en || "");
          const translatedCategoryEn = photo.category_id ? await translateText(photo.category_id, "en") : (photo.category_en || "");
          return {
            ...photo,
            title_en: translatedTitleEn || photo.title_en || "",
            category_en: photo.category_en || translatedCategoryEn || "",
          };
        })
      );
    } else {
      console.log("Translating Gallery section from EN -> ID via Groq AI...");
      [badge_id, header_title_id, header_subtitle_id, btn_text_id] = await Promise.all([
        translateText(badge_en, "id"),
        translateText(header_title_en, "id"),
        translateText(header_subtitle_en, "id"),
        translateText(btn_text_en, "id"),
      ]);

      // Translate photos array items
      photos_json = await Promise.all(
        photos_json.map(async (photo: any) => {
          const translatedTitleId = photo.title_en ? await translateText(photo.title_en, "id") : (photo.title_id || "");
          const translatedCategoryId = photo.category_en ? await translateText(photo.category_en, "id") : (photo.category_id || "");
          return {
            ...photo,
            title_id: translatedTitleId || photo.title_id || "",
            category_id: photo.category_id || translatedCategoryId || "",
          };
        })
      );
    }

    const updatedRows = await sql`
      UPDATE gallery_content
      SET
        badge_id = ${badge_id},
        badge_en = ${badge_en},
        header_title_id = ${header_title_id},
        header_title_en = ${header_title_en},
        header_subtitle_id = ${header_subtitle_id},
        header_subtitle_en = ${header_subtitle_en},
        btn_text_id = ${btn_text_id},
        btn_text_en = ${btn_text_en},
        photos_json = ${JSON.stringify(photos_json)}::jsonb,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten Galeri Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating Gallery content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
