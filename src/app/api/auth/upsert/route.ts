import { NextResponse } from "next/server";
import { z } from "zod";
import { upsertUserByEmail } from "@/lib/userDb";

const BodySchema = z.object({
  email: z.string().email(),
  name: z.string().trim().min(1).optional(),
  kind: z.enum(["guest", "account"]),
  password: z.string().min(6).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const user = await upsertUserByEmail(parsed.data);
  return NextResponse.json({ user });
}
