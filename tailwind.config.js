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
        paper: {
          50:  "#fdfaf4",
          100: "#f7f2e8",
          200: "#ede5d0",
          300: "#ddd0b4",
          400: "#c8b89a",
          500: "#b09878",
          600: "#8c7355",
          700: "#6b5540",
          800: "#4a3828",
          900: "#2c1f14",
          950: "#1a1008",
        },
        denim: {
          light: "#9aadc4",
          DEFAULT: "#6b7ea8",
          dark:  "#4a5f82",
          900:   "#2a3a52",
        },
        olive: {
          light: "#aab580",
          DEFAULT: "#7a8654",
          dark:  "#556038",
        },
        rose: {
          light: "#d4a090",
          DEFAULT: "#b8735a",
          dark:  "#8a5040",
        },
        cork:  "#c4904a",
      },
      fontFamily: {
        typewriter: ["'Special Elite'", "Courier New", "monospace"],
        hand:       ["'Caveat'", "cursive"],
        body:       ["'DM Sans'", "sans-serif"],
      },
      backgroundImage: {
        "paper-texture": `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        "cork-texture":  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23c4904a' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
      },
      rotate: {
        "1": "1deg",
        "2": "2deg",
        "-1": "-1deg",
        "-2": "-2deg",
      },
      boxShadow: {
        "polaroid": "2px 4px 12px rgba(44, 31, 20, 0.15), 0 1px 3px rgba(44, 31, 20, 0.1)",
        "polaroid-hover": "4px 8px 20px rgba(44, 31, 20, 0.2), 0 2px 6px rgba(44, 31, 20, 0.12)",
        "pin": "1px 2px 6px rgba(44, 31, 20, 0.3)",
        "paper": "0 1px 4px rgba(44, 31, 20, 0.08)",
      },
    },
  },
  plugins: [],
};