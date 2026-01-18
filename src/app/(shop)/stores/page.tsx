import Link from "next/link";

export default function StoresPage() {
  return (
    <main className="min-h-screen bg-alabaster pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-sans text-4xl md:text-5xl tracking-tight mb-4">
            Our Stores
          </h1>
          <p className="font-mono text-xs text-charcoal/60 tracking-wide">
            EXPERIENCE VEPHYR IN PERSON
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-24 px-8 bg-white border border-charcoal/5">
          <div className="mb-8">
            <span className="inline-block font-mono text-[10px] tracking-widest text-charcoal/40 px-4 py-2 border border-charcoal/10">
              COMING 2026
            </span>
          </div>
          
          <h2 className="font-sans text-2xl md:text-3xl mb-6">
            Physical Retail Coming Soon
          </h2>
          
          <p className="font-mono text-sm text-charcoal/60 max-w-md mx-auto leading-relaxed mb-12">
            We are currently operating exclusively online. Our flagship retail experience 
            is in development and will be announced soon.
          </p>

          <div className="space-y-4">
            <p className="font-mono text-[10px] tracking-widest text-charcoal/40">
              BE THE FIRST TO KNOW
            </p>
            <form className="flex gap-2 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="flex-1 px-4 py-3 bg-alabaster border border-charcoal/10 font-mono text-xs focus:outline-none focus:border-charcoal/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-charcoal text-alabaster font-mono text-xs tracking-widest hover:bg-black transition-colors"
              >
                NOTIFY
              </button>
            </form>
          </div>
        </div>

        {/* Pop-ups Section */}
        <section className="mt-16">
          <h3 className="font-mono text-[10px] tracking-widest text-charcoal/40 mb-6 text-center">
            UPCOMING POP-UP EVENTS
          </h3>
          
          <div className="text-center py-12 border border-dashed border-charcoal/20">
            <p className="font-mono text-xs text-charcoal/40">
              No upcoming events at this time.
            </p>
            <p className="font-mono text-xs text-charcoal/40 mt-2">
              Follow our{" "}
              <a href="#" className="underline hover:opacity-60">
                Instagram
              </a>{" "}
              for announcements.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 text-center">
          <p className="font-mono text-xs text-charcoal/50 mb-4">
            INTERESTED IN STOCKING VEPHYR?
          </p>
          <Link
            href="/contact"
            className="inline-block font-mono text-xs underline hover:opacity-60"
          >
            Wholesale Inquiries
          </Link>
        </div>
      </div>
    </main>
  );
}
