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
        "dark-red": "#B81122",
        "light-red": "#D51A16",
        "factory-sky": "#3FA7D6",
        "factory-sky50": "#E6F6FD",
        "factory-teal": "#164E63",
        "factory-yellow": "#FFD166",
      },
      fontFamily: {
        noto: ["var(--font-noto-sans-jp)", "sans-serif"],
        sans: ["var(--font-open-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
  safelist: [
    "gradient-red",
    "gradient-navigation",
    "hero-section",
  ],
};

export default config;
