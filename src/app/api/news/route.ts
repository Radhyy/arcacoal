import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { translateText } from "@/lib/groq";

// GET: Fetch all news items, ordered by date descending
export async function GET() {
  try {
    const rows = await sql`
      SELECT * FROM news_items ORDER BY created_at DESC
    `;
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST: Create a new news item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sourceLanguage = body.sourceLanguage || "id"; // "id" or "en"
    
    let title_id = body.title_id || "";
    let title_en = body.title_en || "";
    let content_id = body.content_id || "";
    let content_en = body.content_en || "";
    let image_url = body.image_url || "";

    if (sourceLanguage === "id") {
      [title_en, content_en] = await Promise.all([
        translateText(title_id, "en"),
        translateText(content_id, "en"),
      ]);
    } else {
      [title_id, content_id] = await Promise.all([
        translateText(title_en, "id"),
        translateText(content_en, "id"),
      ]);
    }

    const insertedRows = await sql`
      INSERT INTO news_items (title_id, title_en, content_id, content_en, image_url)
      VALUES (${title_id}, ${title_en}, ${content_id}, ${content_en}, ${image_url})
      RETURNING *;
    `;

    return NextResponse.json({ success: true, data: insertedRows[0] });
  } catch (error: any) {
    console.error("Error creating news:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT: Update an existing news item
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, sourceLanguage = "id", image_url } = body;
    
    let title_id = body.title_id || "";
    let title_en = body.title_en || "";
    let content_id = body.content_id || "";
    let content_en = body.content_en || "";

    if (!id) {
       return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    if (sourceLanguage === "id") {
      [title_en, content_en] = await Promise.all([
        translateText(title_id, "en"),
        translateText(content_id, "en"),
      ]);
    } else {
      [title_id, content_id] = await Promise.all([
        translateText(title_en, "id"),
        translateText(content_en, "id"),
      ]);
    }

    const updatedRows = await sql`
      UPDATE news_items
      SET 
        title_id = ${title_id}, 
        title_en = ${title_en}, 
        content_id = ${content_id}, 
        content_en = ${content_en}, 
        image_url = ${image_url}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ success: true, data: updatedRows[0] });
  } catch (error: any) {
    console.error("Error updating news:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE: Remove a news item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
       return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    await sql`DELETE FROM news_items WHERE id = ${id}`;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting news:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
