import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";
import { links } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, ctx: any) {
  const { code } = await ctx.params;

  const result = await db
    .select()
    .from(links)
    .where(eq(links.code, code))
    .limit(1);

  if (result.length === 0) {
    return new NextResponse("Shortcode Not Found", { status: 404 });
  }

  const link = result[0];

  await db
    .update(links)
    .set({
      totalClicks: (link.totalClicks ?? 0) + 1,
      lastClicked: new Date()
    })
    .where(eq(links.code, code));

  return NextResponse.redirect(link.targetUrl);
}
