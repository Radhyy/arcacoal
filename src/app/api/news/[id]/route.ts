import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const rows = await sql`
      SELECT * FROM news_items WHERE id = ${id}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error: any) {
    console.error("Error fetching single news:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
