import { Navbar } from "@/components/layout/Navbar";
import { SidebarMenu } from "@/components/layout/SidebarMenu";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { AuthModal } from "@/components/auth/AuthModal";
import { Footer } from "@/components/layout/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarMenu />
      <CartDrawer />
      <AuthModal />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
