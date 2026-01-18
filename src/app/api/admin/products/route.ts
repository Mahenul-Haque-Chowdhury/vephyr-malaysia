import { NextResponse } from "next/server";

import { createAdminProduct, getAdminProducts } from "@/lib/adminProductsDb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const products = await getAdminProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  try {
    const created = await createAdminProduct(body);
    return NextResponse.json({ product: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid product payload" }, { status: 400 });
  }
}
