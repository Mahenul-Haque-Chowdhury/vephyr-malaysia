import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyUserPassword, upsertUserByEmail } from "@/lib/userDb";

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
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

  const found = await verifyUserPassword(parsed.data);
  if (!found) {
    // Do not leak whether email exists.
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Update lastSeenAt (and ensure kind is account)
  const user = await upsertUserByEmail({
    email: found.email,
    kind: "account",
    name: found.name,
  });

  return NextResponse.json({ user });
}
