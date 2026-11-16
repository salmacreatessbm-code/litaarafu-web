import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Egyptian inlaid goldwork palette (brand bible, section 2.1)
        papyrus: {
          DEFAULT: "#F7F3EB", // Warm Papyrus: background canvas
          light: "#FBF8F2", // raised cards (never pure white)
          deep: "#EFE8DA", // recessed panels
        },
        ink: "#1B2028", // Obsidian Ink: primary text
        lapis: {
          DEFAULT: "#1B3B6F", // Royal Lapis Lazuli: brand + Fusha
          dark: "#132B52",
        },
        carnelian: {
          DEFAULT: "#C84B31", // large headings and accents only
          deep: "#A33620", // accessible small text, badges, links
        },
        malachite: "#2F664B", // Qur'anic layer
        turquoise: "#248EA6", // decorative highlights only
        gold: "#C49A3A", // borders and dividers only
      },
      fontFamily: {
        latin: ["var(--font-lora)", "Georgia", "serif"],
        arabic: ["var(--font-amiri)", "Amiri", "serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
