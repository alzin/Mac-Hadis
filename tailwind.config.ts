import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ["var(--font-noto-sans-jp)", "sans-serif"], // Use the variable here
      },
      colors: {
        "light-red": "#D51A16",
        "dark-red": "#B81122",
        factory: {
          sky: '#3FA7D6',     // accent blue
          teal: '#164E63',    // deep teal (headings)
          yellow: '#FFD166',  // callouts / timeline
          sky50: '#E6F6FD',   // light panel background
        },
      },
      textShadow: {
        red: "-2px -2px 0 #4AC061, 2px -2px 0 #4AC061, -2px 2px 0 #4AC061, 2px 2px 0 #4AC061",
      },
    },
  },
} satisfies Config;