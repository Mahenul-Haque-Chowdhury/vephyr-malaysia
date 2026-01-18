const FAQS = [
  {
    q: "SHIPPING DESTINATIONS",
    a: "We ship globally via DHL Express. All orders are processed within 24 hours."
  },
  {
    q: "RETURNS & EXCHANGES",
    a: "Returns are accepted within 14 days of delivery. Items must be unworn with original tags attached."
  },
  {
    q: "SIZING",
    a: "Our garments are cut with an intentional oversized fit. We recommend taking your standard size for the intended silhouette."
  },
  {
    q: "CARE INSTRUCTIONS",
    a: "Dry clean or cold wash only. Do not tumble dry."
  }
];

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-sans text-4xl text-charcoal tracking-wide mb-16">
          FAQ
        </h1>

        <div className="space-y-12">
          {FAQS.map((item, i) => (
            <div key={i} className="space-y-4 pb-8 border-b border-charcoal/10 last:border-0 hover:pl-4 transition-all duration-300">
              <h3 className="font-mono text-xs tracking-widest text-charcoal/60">
                0{i + 1}. {item.q}
              </h3>
              <p className="font-mono text-sm leading-relaxed max-w-xl">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
