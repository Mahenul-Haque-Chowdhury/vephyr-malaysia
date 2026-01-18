import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export const Hero = () => {
  const prefersReducedMotion = useReducedMotion();
  const titleDelay = prefersReducedMotion ? 0 : 0.95;
  const subtitleDelay = prefersReducedMotion ? 0 : 1.15;
  const textEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const textTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: textEase };

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
        <div className="relative overflow-hidden">
          <motion.h2
            className="font-sans text-[12vw] leading-none tracking-tight text-charcoal"
            initial={prefersReducedMotion ? false : { opacity: 0, y: "120%" }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ ...textTransition, delay: titleDelay }}
          >
            VEPHYR
          </motion.h2>
        </div>
        <motion.p
          className="font-mono text-xs md:text-sm tracking-[0.3em] mt-4 text-alabaster"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ ...textTransition, delay: subtitleDelay }}
        >
          SPRING / SUMMER 2026
        </motion.p>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="font-mono text-[10px] tracking-widest opacity-60">SCROLL</span>
        </div>
      </div>
    </section>
  );
};
