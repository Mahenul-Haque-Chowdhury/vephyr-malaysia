import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette
        alabaster: '#F2F0EB', // Main background: Warm, paper-like
        charcoal: '#1A1A1A',  // Primary text/accents: Softer than pure black
        
        // Utility
        'glass-panel': 'rgba(242, 240, 235, 0.8)', // For strict glassmorphism
        border: '#E5E5E5',
      },
      fontFamily: {
        // Editorial Headers
        sans: ['var(--font-tenor)', 'sans-serif'], 
        // Tech/Specs Body
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      spacing: {
        'collection': '40rem', // Specific height for large editorial images
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in-slow': 'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
