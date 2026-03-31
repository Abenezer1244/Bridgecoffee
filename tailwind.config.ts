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
        espresso: {
          DEFAULT: "#0D0A07",
          light: "#120E09",
          warm: "#1A0F06",
        },
        ivory: {
          DEFAULT: "#F5EDD6",
        },
        amber: {
          DEFAULT: "#C8873A",
          light: "#E8C99A",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "widest-plus": "0.2em",
      },
    },
  },
  plugins: [],
};

export default config;
