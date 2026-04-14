/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080808",
          900: "#0f0f0f",
          800: "#171717",
          700: "#222222",
          600: "#2e2e2e",
          500: "#3d3d3d",
          400: "#5a5a5a",
          300: "#888888",
          200: "#b0b0b0",
          100: "#d4d4d4",
          50:  "#f0ede8",
        },
        gold: {
          DEFAULT: "#c8a97e",
          light:   "#e0c9a6",
          dark:    "#8c6f4e",
        },
        cream: "#faf7f2",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body:    ["'Outfit'", "sans-serif"],
        mono:    ["'DM Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
      backgroundImage: {
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};