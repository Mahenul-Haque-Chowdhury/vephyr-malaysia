import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-charcoal/10 z-10" />
      
      {/* Hero Image */}
      <Image
        src="/homehero.jpg"
        alt="Vephyr SS26 Campaign"
        fill
        className="object-cover object-top"
        quality={100}
        sizes="100vw"
        priority
      />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-alabaster px-4">
        <h2 className="font-sans text-[12vw] leading-none tracking-tight text-charcoal">
          VEPHYR
        </h2>
        <p className="font-mono text-xs md:text-sm tracking-[0.3em] mt-4 text-charcoal">
          SPRING / SUMMER 2026
        </p>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="font-mono text-[10px] tracking-widest opacity-60">SCROLL</span>
        </div>
      </div>
    </section>
  );
};
