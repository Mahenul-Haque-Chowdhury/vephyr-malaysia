export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 px-6 md:px-12 bg-alabaster">
      <div className="max-w-xl mx-auto space-y-12 animate-slide-up">
        
        <h1 className="font-sans text-4xl text-charcoal tracking-wide">
          CONTACT
        </h1>

        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-mono text-xs tracking-widest text-charcoal/40">CLIENT SERVICES</h2>
            <p className="font-mono text-sm underline decoration-charcoal/20 hover:decoration-charcoal">
              concierge@vephyr.com
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-xs tracking-widest text-charcoal/40">PRESS / WHOLESALE</h2>
            <p className="font-mono text-sm underline decoration-charcoal/20 hover:decoration-charcoal">
              press@vephyr.com
            </p>
          </div>

          <form className="pt-12 space-y-8">
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider block opacity-60">Subject</label>
              <select className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none rounded-none">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Returns</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="font-mono text-[10px] uppercase tracking-wider block opacity-60">Message</label>
              <textarea 
                rows={4}
                className="w-full bg-transparent border-b border-charcoal/20 py-2 font-mono text-sm focus:outline-none focus:border-charcoal resize-none placeholder:text-charcoal/20"
                placeholder="How can we assist you?"
              />
            </div>

            <button className="bg-charcoal text-alabaster px-8 py-3 font-mono text-xs tracking-widest hover:bg-black transition-colors">
              SEND MESSAGE
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
