export default function SizingPage() {
  const sizeCharts = {
    tops: {
      headers: ["Size", "Chest (in)", "Length (in)", "Sleeve (in)"],
      rows: [
        ["XS", "34-36", "26", "32"],
        ["S", "36-38", "27", "33"],
        ["M", "38-40", "28", "34"],
        ["L", "40-42", "29", "35"],
        ["XL", "42-44", "30", "36"],
        ["XXL", "44-46", "31", "37"],
      ],
    },
    bottoms: {
      headers: ["Size", "Waist (in)", "Hip (in)", "Inseam (in)"],
      rows: [
        ["XS", "28-29", "34-35", "30"],
        ["S", "30-31", "36-37", "31"],
        ["M", "32-33", "38-39", "32"],
        ["L", "34-35", "40-41", "32"],
        ["XL", "36-37", "42-43", "33"],
        ["XXL", "38-40", "44-46", "33"],
      ],
    },
  };

  return (
    <main className="min-h-screen bg-alabaster pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-sans text-4xl md:text-5xl tracking-tight mb-4">
            Size Guide
          </h1>
          <p className="font-mono text-xs text-charcoal/60 tracking-wide max-w-md mx-auto">
            OUR GARMENTS ARE DESIGNED WITH AN OVERSIZED, RELAXED FIT. 
            WE RECOMMEND SIZING DOWN FOR A MORE TAILORED SILHOUETTE.
          </p>
        </div>

        {/* How to Measure */}
        <section className="mb-16 p-8 bg-white border border-charcoal/5">
          <h2 className="font-sans text-xl mb-6">How to Measure</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Chest",
                desc: "Measure around the fullest part of your chest, keeping the tape level.",
              },
              {
                title: "Waist",
                desc: "Measure around your natural waistline, keeping the tape comfortably loose.",
              },
              {
                title: "Hip",
                desc: "Measure around the fullest part of your hips, about 8 inches below your waist.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-mono text-xs tracking-widest text-charcoal/50 mb-2">
                  {item.title.toUpperCase()}
                </h3>
                <p className="font-mono text-xs text-charcoal/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Size Charts */}
        <div className="space-y-12">
          {/* Tops */}
          <section>
            <h2 className="font-sans text-xl mb-6">Tops & Outerwear</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-charcoal/10">
                <thead>
                  <tr className="bg-charcoal/5">
                    {sizeCharts.tops.headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left font-mono text-[10px] tracking-widest text-charcoal/50 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.tops.rows.map((row, i) => (
                    <tr key={i} className="border-t border-charcoal/5">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-6 py-4 font-mono text-sm ${
                            j === 0 ? "font-medium" : "text-charcoal/70"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Bottoms */}
          <section>
            <h2 className="font-sans text-xl mb-6">Bottoms</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-charcoal/10">
                <thead>
                  <tr className="bg-charcoal/5">
                    {sizeCharts.bottoms.headers.map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left font-mono text-[10px] tracking-widest text-charcoal/50 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.bottoms.rows.map((row, i) => (
                    <tr key={i} className="border-t border-charcoal/5">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-6 py-4 font-mono text-sm ${
                            j === 0 ? "font-medium" : "text-charcoal/70"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Help */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 text-center">
          <p className="font-mono text-xs text-charcoal/50 mb-4">
            NEED HELP FINDING YOUR SIZE?
          </p>
          <p className="font-mono text-xs text-charcoal/70">
            Contact our Client Services team at{" "}
            <a href="mailto:support@vephyr.com" className="underline hover:opacity-60">
              support@vephyr.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
