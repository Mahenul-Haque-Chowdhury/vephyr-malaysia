import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { z } from "zod";

import type { AdminProduct, AdminProductStatus } from "@/lib/adminProducts";

const DATA_PATH = path.join(process.cwd(), "data", "products.json");

const AdminProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  sku: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  status: z.enum(["active", "draft"]) satisfies z.ZodType<AdminProductStatus>,
  image: z.string().min(1),
  category: z.string().min(1),
}) satisfies z.ZodType<AdminProduct>;

const AdminProductCreateSchema = AdminProductSchema.omit({ id: true });
const AdminProductPatchSchema = AdminProductCreateSchema.partial();

async function readJsonFile(): Promise<unknown> {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw);
}

async function writeJsonFile(value: unknown): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(value, null, 2) + "\n", "utf8");
}

export async function getAdminProducts(): Promise<AdminProduct[]> {
  try {
    const data = await readJsonFile();
    const parsed = z.array(AdminProductSchema).safeParse(data);
    if (parsed.success) return parsed.data;
    return [];
  } catch {
    // If the file is missing or invalid, return empty.
    // (The repo seeds data/products.json, so this should be rare.)
    return [];
  }
}

export async function getAdminProductById(id: string): Promise<AdminProduct | null> {
  const products = await getAdminProducts();
  return products.find((p) => String(p.id) === String(id)) ?? null;
}

export async function createAdminProduct(input: unknown): Promise<AdminProduct> {
  const parsed = AdminProductCreateSchema.parse(input);
  const products = await getAdminProducts();

  const product: AdminProduct = {
    ...parsed,
    id: randomUUID(),
  };

  await writeJsonFile([product, ...products]);
  return product;
}

export async function updateAdminProduct(id: string, patch: unknown): Promise<AdminProduct | null> {
  const parsedPatch = AdminProductPatchSchema.parse(patch);
  const products = await getAdminProducts();
  const index = products.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  const updated: AdminProduct = AdminProductSchema.parse({
    ...products[index],
    ...parsedPatch,
    id: products[index].id,
  });

  const next = [...products];
  next[index] = updated;
  await writeJsonFile(next);

  return updated;
}

export async function deleteAdminProduct(id: string): Promise<boolean> {
  const products = await getAdminProducts();
  const next = products.filter((p) => String(p.id) !== String(id));
  if (next.length === products.length) return false;
  await writeJsonFile(next);
  return true;
}
