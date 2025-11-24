import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/app/lib/db";
import { links } from "@/app/lib/schema";
import { eq } from "drizzle-orm";

// Validation schema
const LinkSchema = z.object({
  url: z.string().url(),
  code: z.string().optional(),   // custom shortcode is optional
});

// Random shortcode generator
function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { url, code } = LinkSchema.parse(body);

    let finalCode = code || generateCode(7); // auto generate if custom not given

    // Check if code already exists
    const existing = await db
      .select()
      .from(links)
      .where(eq(links.code, finalCode));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Shortcode already exists" },
        { status: 409 }
      );
    }

    // Insert into DB
    await db.insert(links).values({
      code: finalCode,
      targetUrl: url,
    });

    return NextResponse.json(
      {
        message: "Short URL created",
        code: finalCode,
        shortUrl: `${process.env.BASE_URL}/${finalCode}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const allLinks = await db.select().from(links).orderBy(links.createdAt);

    return NextResponse.json(allLinks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}
