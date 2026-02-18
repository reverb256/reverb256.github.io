/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      // Tinted Color Scheme - Monochromatic Purple with Orange Accent
      colors: {
        // Primary tint (purple-based)
        ink: {
          50: "#faf8fc",
          100: "#f3eef8",
          200: "#e8def0",
          300: "#d4c6e3",
          400: "#b69cd0",
          500: "#9975bc",
          600: "#7e5aa3",
          700: "#684989",
          800: "#573f71",
          900: "#4a365f",
          950: "#1a1029",
        },
        // Accent (warm orange - pops against purple)
        ember: {
          50: "#fff8f4",
          100: "#fff0e6",
          200: "#ffdfc7",
          300: "#ffc59a",
          400: "#ff9f5c",
          500: "#ff7a2a",
          600: "#f05c1a",
          700: "#c94412",
          800: "#a33814",
          900: "#863116",
          950: "#481809",
        },
        // Neutral (cool grays)
        slate: {
          850: "#172033",
          950: "#0a0f18",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "slide-right": "slideRight 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 122, 42, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 122, 42, 0.6)" },
        },
      },
      // Bento grid
      gridTemplateColumns: {
        bento: "repeat(4, 1fr)",
      },
      gridAutoRows: {
        bento: "minmax(180px, auto)",
      },
    },
  },
  plugins: [],
};
