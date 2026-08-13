import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch Legality Section Content from Neon PostgreSQL
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM legality_content WHERE id = 1 LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: false, message: "No legality content found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching Legality content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update Legality Section Content in Neon PostgreSQL (with Bi-directional Groq AI Translation)
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

    let paragraph_id = body.paragraph_id || "";
    let paragraph_en = body.paragraph_en || "";

    let nib_title_id = body.nib_title_id || "";
    let nib_title_en = body.nib_title_en || "";
    let nib_sub_id = body.nib_sub_id || "";
    let nib_sub_en = body.nib_sub_en || "";

    let npwp_title_id = body.npwp_title_id || "";
    let npwp_title_en = body.npwp_title_en || "";
    let npwp_sub_id = body.npwp_sub_id || "";
    let npwp_sub_en = body.npwp_sub_en || "";

    let dest_text_id = body.dest_text_id || "";
    let dest_text_en = body.dest_text_en || "";
    let note_text_id = body.note_text_id || "";
    let note_text_en = body.note_text_en || "";

    let box_title_id = body.box_title_id || "";
    let box_title_en = body.box_title_en || "";
    let box_sub_id = body.box_sub_id || "";
    let box_sub_en = body.box_sub_en || "";

    let std_doc_title_id = body.std_doc_title_id || "";
    let std_doc_title_en = body.std_doc_title_en || "";
    let add_doc_title_id = body.add_doc_title_id || "";
    let add_doc_title_en = body.add_doc_title_en || "";

    let footer_text_id = body.footer_text_id || "";
    let footer_text_en = body.footer_text_en || "";
    let btn_text_id = body.btn_text_id || "";
    let btn_text_en = body.btn_text_en || "";

    let standard_docs_json = body.standard_docs_json || [];
    let additional_docs_json = body.additional_docs_json || [];

    if (sourceLanguage === "id") {
      console.log("Translating Legality section from ID -> EN via Groq AI...");
      [
        badge_en,
        header_title_en,
        header_subtitle_en,
        paragraph_en,
        nib_title_en,
        nib_sub_en,
        npwp_title_en,
        npwp_sub_en,
        dest_text_en,
        note_text_en,
        box_title_en,
        box_sub_en,
        std_doc_title_en,
        add_doc_title_en,
        footer_text_en,
        btn_text_en,
      ] = await Promise.all([
        translateText(badge_id, "en"),
        translateText(header_title_id, "en"),
        translateText(header_subtitle_id, "en"),
        translateText(paragraph_id, "en"),
        translateText(nib_title_id, "en"),
        translateText(nib_sub_id, "en"),
        translateText(npwp_title_id, "en"),
        translateText(npwp_sub_id, "en"),
        translateText(dest_text_id, "en"),
        translateText(note_text_id, "en"),
        translateText(box_title_id, "en"),
        translateText(box_sub_id, "en"),
        translateText(std_doc_title_id, "en"),
        translateText(add_doc_title_id, "en"),
        translateText(footer_text_id, "en"),
        translateText(btn_text_id, "en"),
      ]);
    } else {
      console.log("Translating Legality section from EN -> ID via Groq AI...");
      [
        badge_id,
        header_title_id,
        header_subtitle_id,
        paragraph_id,
        nib_title_id,
        nib_sub_id,
        npwp_title_id,
        npwp_sub_id,
        dest_text_id,
        note_text_id,
        box_title_id,
        box_sub_id,
        std_doc_title_id,
        add_doc_title_id,
        footer_text_id,
        btn_text_id,
      ] = await Promise.all([
        translateText(badge_en, "id"),
        translateText(header_title_en, "id"),
        translateText(header_subtitle_en, "id"),
        translateText(paragraph_en, "id"),
        translateText(nib_title_en, "id"),
        translateText(nib_sub_en, "id"),
        translateText(npwp_title_en, "id"),
        translateText(npwp_sub_en, "id"),
        translateText(dest_text_en, "id"),
        translateText(note_text_en, "id"),
        translateText(box_title_en, "id"),
        translateText(box_sub_en, "id"),
        translateText(std_doc_title_en, "id"),
        translateText(add_doc_title_en, "id"),
        translateText(footer_text_en, "id"),
        translateText(btn_text_en, "id"),
      ]);
    }

    const updatedRows = await sql`
      UPDATE legality_content
      SET
        badge_id = ${badge_id},
        badge_en = ${badge_en},
        header_title_id = ${header_title_id},
        header_title_en = ${header_title_en},
        header_subtitle_id = ${header_subtitle_id},
        header_subtitle_en = ${header_subtitle_en},

        paragraph_id = ${paragraph_id},
        paragraph_en = ${paragraph_en},

        nib_title_id = ${nib_title_id},
        nib_title_en = ${nib_title_en},
        nib_sub_id = ${nib_sub_id},
        nib_sub_en = ${nib_sub_en},

        npwp_title_id = ${npwp_title_id},
        npwp_title_en = ${npwp_title_en},
        npwp_sub_id = ${npwp_sub_id},
        npwp_sub_en = ${npwp_sub_en},

        dest_text_id = ${dest_text_id},
        dest_text_en = ${dest_text_en},
        note_text_id = ${note_text_id},
        note_text_en = ${note_text_en},

        box_title_id = ${box_title_id},
        box_title_en = ${box_title_en},
        box_sub_id = ${box_sub_id},
        box_sub_en = ${box_sub_en},

        std_doc_title_id = ${std_doc_title_id},
        std_doc_title_en = ${std_doc_title_en},
        add_doc_title_id = ${add_doc_title_id},
        add_doc_title_en = ${add_doc_title_en},

        footer_text_id = ${footer_text_id},
        footer_text_en = ${footer_text_en},
        btn_text_id = ${btn_text_id},
        btn_text_en = ${btn_text_en},

        standard_docs_json = ${JSON.stringify(standard_docs_json)}::jsonb,
        additional_docs_json = ${JSON.stringify(additional_docs_json)}::jsonb,

        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
      RETURNING *;
    `;

    return NextResponse.json({
      success: true,
      message: `Konten Legalitas Berhasil Disimpan & Diterjemahkan (${sourceLanguage.toUpperCase()} <-> ${sourceLanguage === 'id' ? 'EN' : 'ID'}) oleh Groq AI!`,
      data: updatedRows[0],
    });
  } catch (error: any) {
    console.error("Error updating Legality content:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
