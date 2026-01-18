import { NextResponse } from "next/server";
import { z } from "zod";
import { updateUserById } from "@/lib/userDb";

const AddressSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  fullName: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  region: z.string().optional(),
  postalCode: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().optional(),
  isDefaultShipping: z.boolean().optional(),
  isDefaultBilling: z.boolean().optional(),
});

const SettingsSchema = z.object({
  language: z.string().optional(),
  currency: z.string().optional(),
  marketingEmails: z.boolean().optional(),
  orderUpdates: z.boolean().optional(),
  productDrops: z.boolean().optional(),
  dataSharing: z.boolean().optional(),
});

const BodySchema = z.object({
  userId: z.string().min(1),
  name: z.string().trim().min(1).optional(),
  addresses: z.array(AddressSchema).optional(),
  settings: SettingsSchema.optional(),
  newPassword: z.string().min(6).optional(),
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

  const updated = await updateUserById(parsed.data);
  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: updated });
}
