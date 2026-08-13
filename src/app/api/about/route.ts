import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch About Section Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM about_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No about content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching About content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update About Section Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const sourceLanguage = body.sourceLanguage || "id"; // "id" or "en"
    const company_name = body.company_name || 'PT Arcadia Charcoal Indonesia';

    let logo_url = body.logo_url || "https://i.ibb.co/390VGD59/60dd68b6112c.png";
    let badge_id = body.badge_id || "";
    let badge_en = body.badge_en || "";
    let title_id = body.title_id || "";
    let title_en = body.title_en || "";
    let subtitle_id = body.subtitle_id || "";
    let subtitle_en = body.subtitle_en || "";
    let paragraph1_id = body.paragraph1_id || "";
    let paragraph1_en = body.paragraph1_en || "";
    let paragraph2_id = body.paragraph2_id || "";
    let paragraph2_en = body.paragraph2_en || "";
    let quote_id = body.quote_id || "";
    let quote_en = body.quote_en || "";
    let bullet1_id = body.bullet1_id || "";
    let bullet1_en = body.bullet1_en || "";
    let bullet2_id = body.bullet2_id || "";
    let bullet2_en = body.bullet2_en || "";
    let bullet3_id = body.bullet3_id || "";
    let bullet3_en = body.bullet3_en || "";

    if (sourceLanguage === "id") {
      console.log("Translating About section from ID -> EN via Groq AI...");
      [
        badge_en,
        title_en,
        subtitle_en,
        paragraph1_en,
        paragraph2_en,
        quote_en,
        bullet1_en,
        bullet2_en,
        bullet3_en,
      ] = await Promise.all([
        translateText(badge_id, "en"),
        translateText(title_id, "en"),
        translateText(subtitle_id, "en"),
        translateText(paragraph1_id, "en"),
        translateText(paragraph2_id, "en"),
        translateText(quote_id, "en"),
        translateText(bullet1_id, "en"),
        translateText(bullet2_id, "en"),
        translateText(bullet3_id, "en"),
      ]);
    } else {
      console.log("Translating About section from EN -> ID via Groq AI...");
      [
        badge_id,
        title_id,
        subtitle_id,
        paragraph1_id,
        paragraph2_id,
        quote_id,
        bullet1_id,
        bullet2_id,
        bullet3_id,
      ] = await Promise.all([
        translateText(badge_en, "id"),
        translateText(title_en, "id"),
        translateText(subtitle_en, "id"),
        translateText(paragraph1_en, "id"),
        translateText(paragraph2_en, "id"),
        translateText(quote_en, "id"),
        translateText(bullet1_en, "id"),
        translateText(bullet2_en, "id"),
        translateText(bullet3_en, "id"),
      ]);
    }

    const updatedRows = await sql`
      UPDATE about_content
      SET
        logo_url = ${logo_url},
        company_name = ${company_name},
        badge_id = ${badge_id},
        badge_en = ${badge_en},
        title_id = ${title_id},
        title_en = ${title_en},
        subtitle_id = ${subtitle_id},
        subtitle_en = ${subtitle_en},
        paragraph1_id = ${paragraph1_id},
        paragraph1_en = ${paragraph1_en},
        paragraph2_id = ${paragraph2_id},
        paragraph2_en = ${paragraph2_en},
        quote_id = ${quote_id},
        quote_en = ${quote_en},
        bullet1_id = ${bullet1_id},
        bullet1_en = ${bullet1_en},
        bullet2_id = ${bullet2_id},
        bullet2_en = ${bullet2_en},
        bullet3_id = ${bullet3_id},
        bullet3_en = ${bullet3_en},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten About Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating About content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
