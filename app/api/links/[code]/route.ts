import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { links } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, ctx: any) {
  const { code } = await ctx.params;

  const data = await db
    .select()
    .from(links)
    .where(eq(links.code, code));

  if (data.length === 0) {
    return NextResponse.json({ error: "Shortcode not found" }, { status: 404 });
  }

  return NextResponse.json(data[0]);
}

export async function DELETE(req: Request, ctx: any) {
  const { code } = await ctx.params;

  const deleted = await db
    .delete(links)
    .where(eq(links.code, code))
    .returning();

  if (deleted.length === 0) {
    return NextResponse.json({ error: "Shortcode not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
