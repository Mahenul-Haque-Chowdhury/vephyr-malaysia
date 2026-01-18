export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
      <div className="max-w-2xl mx-auto space-y-12 animate-fade-in-slow">
        <h1 className="font-sans text-4xl md:text-6xl text-charcoal tracking-wide mb-8">
          MAISON VEPHYR
        </h1>
        
        <div className="space-y-6 font-mono text-sm leading-relaxed text-charcoal/80">
          <p>
            EST. 2026. BORN IN THE INTERSECTION OF DIGITAL UTILITY AND HIGH FASHION.
          </p>
          <p>
            Vephyr is not just a brand; it is a study in silence. In an era of noise, we choose reduction. 
            Our garments are architectural studies—built for the modern nomad who demands both 
            technical performance and editorial aesthetics.
          </p>
          <p>
            We believe in "Invisible Commerce." The shopping experience should feel like walking through 
            an empty gallery—calm, curated, and respectful of your attention.
          </p>
        </div>

        <div className="pt-12 border-t border-charcoal/10">
          <span className="font-mono text-xs tracking-widest text-charcoal/40">HEADQUARTERS</span>
          <p className="font-mono text-sm mt-2">
            Paris, 75003<br />
            France
          </p>
        </div>
      </div>
    </main>
  );
}
