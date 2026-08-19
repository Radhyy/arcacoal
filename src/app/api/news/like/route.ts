import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// POST: Increment the likes_count of a specific news item ID
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
       return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const updatedRows = await sql`
      UPDATE news_items
      SET likes_count = likes_count + 1
      WHERE id = ${id}
      RETURNING likes_count;
    `;

    if (updatedRows.length === 0) {
       return NextResponse.json({ success: false, message: "News item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, likes_count: updatedRows[0].likes_count });
  } catch (error: any) {
    console.error("Error liking news:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
