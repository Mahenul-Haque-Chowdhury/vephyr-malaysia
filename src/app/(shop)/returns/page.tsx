import Link from "next/link";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-alabaster pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-sans text-4xl md:text-5xl tracking-tight mb-4">
            Returns & Exchanges
          </h1>
          <p className="font-mono text-xs text-charcoal/60 tracking-wide">
            YOUR SATISFACTION IS OUR PRIORITY
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Policy Overview */}
          <section className="space-y-4">
            <h2 className="font-sans text-xl">Return Policy</h2>
            <div className="font-mono text-sm text-charcoal/70 space-y-4 leading-relaxed">
              <p>
                We offer a 30-day return policy for all unworn items in their original condition 
                with tags attached. Items must be returned in their original packaging.
              </p>
              <p>
                Sale items and personalized pieces are final sale and cannot be returned or exchanged.
              </p>
            </div>
          </section>

          {/* How to Return */}
          <section className="space-y-6">
            <h2 className="font-sans text-xl">How to Return</h2>
            <div className="grid gap-6">
              {[
                {
                  step: "01",
                  title: "Initiate Return",
                  desc: "Log into your account and select the items you wish to return from your order history."
                },
                {
                  step: "02",
                  title: "Print Label",
                  desc: "Download and print your prepaid return shipping label. Attach it securely to your package."
                },
                {
                  step: "03",
                  title: "Ship",
                  desc: "Drop off your package at any authorized carrier location. Keep your tracking number."
                },
                {
                  step: "04",
                  title: "Refund",
                  desc: "Once received and inspected, your refund will be processed within 5-7 business days."
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6 p-6 bg-white border border-charcoal/5">
                  <span className="font-mono text-2xl text-charcoal/20">{item.step}</span>
                  <div>
                    <h3 className="font-sans text-sm font-medium mb-1">{item.title}</h3>
                    <p className="font-mono text-xs text-charcoal/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Exchanges */}
          <section className="space-y-4">
            <h2 className="font-sans text-xl">Exchanges</h2>
            <div className="font-mono text-sm text-charcoal/70 space-y-4 leading-relaxed">
              <p>
                For exchanges, please return your original item and place a new order for 
                the desired size or color. This ensures the fastest processing time.
              </p>
              <p>
                If you need assistance, our Client Services team is available to help 
                coordinate your exchange.
              </p>
            </div>
          </section>

          {/* International */}
          <section className="space-y-4 p-6 bg-white border border-charcoal/5">
            <h2 className="font-sans text-lg">International Returns</h2>
            <p className="font-mono text-xs text-charcoal/60 leading-relaxed">
              International orders may be subject to return shipping fees. Customs duties 
              and taxes are non-refundable. Please contact us before initiating an 
              international return.
            </p>
          </section>

          {/* CTA */}
          <div className="pt-8 border-t border-charcoal/10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/account"
              className="px-8 py-4 bg-charcoal text-alabaster font-mono text-xs tracking-widest text-center hover:bg-black transition-colors"
            >
              START A RETURN
            </Link>
            <Link 
              href="/contact"
              className="px-8 py-4 border border-charcoal font-mono text-xs tracking-widest text-center hover:bg-charcoal hover:text-alabaster transition-colors"
            >
              CONTACT SUPPORT
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
