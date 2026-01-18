"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/home/ProductGrid";

export const HomePageClient = () => {
  const prefersReducedMotion = useReducedMotion();

  const baseEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const overlayTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.85, ease: baseEase };

  const sectionTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: baseEase };

  const mainTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.0, ease: baseEase };

  return (
    <div className="relative">
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 origin-top bg-alabaster"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={overlayTransition}
      />

      <motion.main
        className="min-h-screen bg-alabaster selection:bg-charcoal selection:text-alabaster"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ ...mainTransition, delay: 0.1 }}
      >
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ ...sectionTransition, delay: 0.9 }}
        >
          <Hero />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ ...sectionTransition, delay: 1.35 }}
        >
          <ProductGrid />
        </motion.div>
      </motion.main>
    </div>
  );
};
