import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch OEM Section Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM oem_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No OEM content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching OEM content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update OEM Section Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const sourceLanguage = body.sourceLanguage || "id"; // "id" or "en"

    let title_id = body.title_id || "";
    let title_en = body.title_en || "";
    let description_id = body.description_id || "";
    let description_en = body.description_en || "";
    let link_text_id = body.link_text_id || "";
    let link_text_en = body.link_text_en || "";

    let p1_title_id = body.p1_title_id || "";
    let p1_title_en = body.p1_title_en || "";
    let p1_desc_id = body.p1_desc_id || "";
    let p1_desc_en = body.p1_desc_en || "";

    let p2_title_id = body.p2_title_id || "";
    let p2_title_en = body.p2_title_en || "";
    let p2_desc_id = body.p2_desc_id || "";
    let p2_desc_en = body.p2_desc_en || "";

    let p3_title_id = body.p3_title_id || "";
    let p3_title_en = body.p3_title_en || "";
    let p3_desc_id = body.p3_desc_id || "";
    let p3_desc_en = body.p3_desc_en || "";

    let p4_title_id = body.p4_title_id || "";
    let p4_title_en = body.p4_title_en || "";
    let p4_desc_id = body.p4_desc_id || "";
    let p4_desc_en = body.p4_desc_en || "";

    if (sourceLanguage === "id") {
      console.log("Translating OEM section from ID -> EN via Groq AI...");
      [
        title_en,
        description_en,
        link_text_en,
        p1_title_en,
        p1_desc_en,
        p2_title_en,
        p2_desc_en,
        p3_title_en,
        p3_desc_en,
        p4_title_en,
        p4_desc_en,
      ] = await Promise.all([
        translateText(title_id, "en"),
        translateText(description_id, "en"),
        translateText(link_text_id, "en"),
        translateText(p1_title_id, "en"),
        translateText(p1_desc_id, "en"),
        translateText(p2_title_id, "en"),
        translateText(p2_desc_id, "en"),
        translateText(p3_title_id, "en"),
        translateText(p3_desc_id, "en"),
        translateText(p4_title_id, "en"),
        translateText(p4_desc_id, "en"),
      ]);
    } else {
      console.log("Translating OEM section from EN -> ID via Groq AI...");
      [
        title_id,
        description_id,
        link_text_id,
        p1_title_id,
        p1_desc_id,
        p2_title_id,
        p2_desc_id,
        p3_title_id,
        p3_desc_id,
        p4_title_id,
        p4_desc_id,
      ] = await Promise.all([
        translateText(title_en, "id"),
        translateText(description_en, "id"),
        translateText(link_text_en, "id"),
        translateText(p1_title_en, "id"),
        translateText(p1_desc_en, "id"),
        translateText(p2_title_en, "id"),
        translateText(p2_desc_en, "id"),
        translateText(p3_title_en, "id"),
        translateText(p3_desc_en, "id"),
        translateText(p4_title_en, "id"),
        translateText(p4_desc_en, "id"),
      ]);
    }

    const updatedRows = await sql`
      UPDATE oem_content
      SET
        title_id = ${title_id},
        title_en = ${title_en},
        description_id = ${description_id},
        description_en = ${description_en},
        link_text_id = ${link_text_id},
        link_text_en = ${link_text_en},

        p1_title_id = ${p1_title_id},
        p1_title_en = ${p1_title_en},
        p1_desc_id = ${p1_desc_id},
        p1_desc_en = ${p1_desc_en},

        p2_title_id = ${p2_title_id},
        p2_title_en = ${p2_title_en},
        p2_desc_id = ${p2_desc_id},
        p2_desc_en = ${p2_desc_en},

        p3_title_id = ${p3_title_id},
        p3_title_en = ${p3_title_en},
        p3_desc_id = ${p3_desc_id},
        p3_desc_en = ${p3_desc_en},

        p4_title_id = ${p4_title_id},
        p4_title_en = ${p4_title_en},
        p4_desc_id = ${p4_desc_id},
        p4_desc_en = ${p4_desc_en},

        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten OEM Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating OEM content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
