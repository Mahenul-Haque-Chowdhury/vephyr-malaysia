import AdminProductsClient from "./AdminProductsClient";
import { getAdminProducts } from "@/lib/adminProductsDb";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();
  return <AdminProductsClient initialProducts={products} />;
}
