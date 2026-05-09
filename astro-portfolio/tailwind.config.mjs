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
        // Retro gaming palettes (mapped to theme tokens)
        retro: {
          // DDR neon
          "ddr-yellow": "#ffd93d",
          "ddr-pink": "#ff2d78",
          "ddr-blue": "#00b4d8",
          "ddr-green": "#00ff88",
          // IIDX difficulty
          "iidx-beginner": "#00c853",
          "iidx-normal": "#2196f3",
          "iidx-hyper": "#ffeb3b",
          "iidx-another": "#ff1744",
          // N64 controller buttons
          "n64-blue": "#3333FF",
          "n64-green": "#45D043",
          "n64-red": "#F86039",
          "n64-yellow": "#E9CD35",
          "n64-cyan": "#17D6E8",
          "n64-purple": "#B97DF2",
          // GameCube
          "gc-indigo": "#4A3A92",
          "gc-spice": "#E8621C",
          // SNES
          "snes-purple": "#A25CC9",
          "snes-gray": "#B7B7B7",
          "snes-blue": "#3A88E4",
          // Dreamcast
          "dc-orange": "#E8621C",
          "dc-blue": "#0072CE",
          "dc-cream": "#F5E6C8",
          // Win95
          "win-teal": "#008080",
          "win-navy": "#000080",
          "win-silver": "#C0C0C0",
          // Gruvbox (Linux tiling WM)
          gruvbox: {
            bg: "#282828",
            fg: "#ebdbb2",
            red: "#cc241d",
            green: "#98971a",
            yellow: "#d79921",
            blue: "#458588",
            purple: "#b16286",
            aqua: "#689d6a",
            orange: "#d65d0e",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
        // Retro gaming fonts
        "retro-condensed": ["Anton", "Impact", "sans-serif"],
        "retro-geometric": ["Orbitron", "Exo 2", "sans-serif"],
        "retro-pixel": ["Press Start 2P", "monospace"],
        "retro-terminal": ["VT323", "Fira Code", "monospace"],
        "retro-gothic": ["Oswald", "Bank Gothic", "Impact", "sans-serif"],
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
