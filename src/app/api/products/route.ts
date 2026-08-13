import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch Products & Specifications Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM products_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No products content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching Products content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update Products & Specifications Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const sourceLanguage = body.sourceLanguage || "id"; // "id" or "en"

    let header_title_id = body.header_title_id || "";
    let header_title_en = body.header_title_en || "";
    let header_subtitle_id = body.header_subtitle_id || "";
    let header_subtitle_en = body.header_subtitle_en || "";

    let products_json = Array.isArray(body.products_json) ? body.products_json : [];

    if (sourceLanguage === "id") {
      console.log("Translating Products section from ID -> EN via Groq AI...");
      [header_title_en, header_subtitle_en] = await Promise.all([
        translateText(header_title_id, "en"),
        translateText(header_subtitle_id, "en"),
      ]);

      // Translate products array items
      products_json = await Promise.all(
        products_json.map(async (prod: any) => {
          const translatedTitleEn = prod.title_id ? await translateText(prod.title_id, "en") : (prod.title_en || "");
          const translatedSubtitleEn = prod.subtitle_id ? await translateText(prod.subtitle_id, "en") : (prod.subtitle_en || "");
          const translatedDescEn = prod.description_id ? await translateText(prod.description_id, "en") : (prod.description_en || "");

          return {
            ...prod,
            title_en: prod.title_en || translatedTitleEn,
            subtitle_en: prod.subtitle_en || translatedSubtitleEn,
            description_en: prod.description_en || translatedDescEn,
          };
        })
      );
    } else {
      console.log("Translating Products section from EN -> ID via Groq AI...");
      [header_title_id, header_subtitle_id] = await Promise.all([
        translateText(header_title_en, "id"),
        translateText(header_subtitle_en, "id"),
      ]);

      // Translate products array items
      products_json = await Promise.all(
        products_json.map(async (prod: any) => {
          const translatedTitleId = prod.title_en ? await translateText(prod.title_en, "id") : (prod.title_id || "");
          const translatedSubtitleId = prod.subtitle_en ? await translateText(prod.subtitle_en, "id") : (prod.subtitle_id || "");
          const translatedDescId = prod.description_en ? await translateText(prod.description_en, "id") : (prod.description_id || "");

          return {
            ...prod,
            title_id: prod.title_id || translatedTitleId,
            subtitle_id: prod.subtitle_id || translatedSubtitleId,
            description_id: prod.description_id || translatedDescId,
          };
        })
      );
    }

    const updatedRows = await sql`
      UPDATE products_content
      SET
        header_title_id = ${header_title_id},
        header_title_en = ${header_title_en},
        header_subtitle_id = ${header_subtitle_id},
        header_subtitle_en = ${header_subtitle_en},
        products_json = ${JSON.stringify(products_json)}::jsonb,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten Produk Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating Products content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
