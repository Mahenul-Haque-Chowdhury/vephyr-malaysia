"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-alabaster border-t border-charcoal/10 pt-24 pb-12 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-24">
          
          {/* Column 1: Newsletter (Dominant) */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-charcoal/40">
              Newsletter
            </h3>
            <p className="font-sans text-xl md:text-2xl leading-relaxed text-charcoal">
              Subscribe for exclusive access to drops, events, and the Maison&apos;s latest news.
            </p>
            <form className="relative border-b border-charcoal/20 pb-2 max-w-xs">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent font-mono text-xs focus:outline-none placeholder:text-charcoal/30 py-2"
              />
              <button 
                type="button"
                className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-50 transition-opacity text-charcoal cursor-pointer"
                aria-label="Submit"
              >
                →
              </button>
            </form>
          </div>

          {/* Spacer for whitespace aesthetics */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Column 2: Client Services */}
          <div className="md:col-span-2 space-y-8">
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-charcoal/40">
              Client Services
            </h3>
            <ul className="space-y-4 font-mono text-xs text-charcoal/70">
              <li>
                <Link href="/contact" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">FAQ</Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Track Order</Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Returns & Exchanges</Link>
              </li>
              <li>
                <Link href="/sizing" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Size Guide</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div className="md:col-span-2 space-y-8">
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-charcoal/40">
              The Maison
            </h3>
            <ul className="space-y-4 font-mono text-xs text-charcoal/70">
              <li>
                <Link href="/about" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">About Vephyr</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Legal & Privacy</Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Stores</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="md:col-span-2 space-y-8">
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-charcoal/40">
              Follow Us
            </h3>
            <ul className="space-y-4 font-mono text-xs text-charcoal/70">
              <li>
                <a href="#" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">Instagram</a>
              </li>
              <li>
                <a href="#" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">X / Twitter</a>
              </li>
              <li>
                <a href="#" className="hover:text-charcoal transition-colors block w-fit cursor-pointer">TikTok</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <Link href="/" className="font-sans text-xs tracking-[0.2em] font-medium hover:opacity-60 transition-opacity cursor-pointer">
              VEPHYR
            </Link>
            <p className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest">
              Malaysia-based cloth brand importing from fine tailors of Bangladesh.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 font-mono text-[10px] text-charcoal/40 uppercase tracking-widest">
            <button className="hover:text-charcoal transition-colors text-left cursor-pointer">
              Country: Malaysia (MYR)
            </button>
            <span className="hidden md:block text-charcoal/10">|</span>
            <Link href="/sitemap" className="hover:text-charcoal transition-colors cursor-pointer">
              Sitemap
            </Link>
            <span className="hidden md:block text-charcoal/10">|</span>
            <span>© 2026 Vephyr</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
