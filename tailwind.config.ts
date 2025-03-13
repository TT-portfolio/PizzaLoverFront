import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "color-text-red": "var(--color-text-red)",
        "color-text-green": "var(--color-text-green)",
        "green-hover": "var(--green-hover)",
        "color-hamburger-bg": "#fdf1d2",
        "color-highlight": "#f7e6ba80"
      },
      fontFamily: {
        mono: ["var(--font-roboto-mono)", ...fontFamily.mono], 
      },
    },
  },
  plugins: [],
} satisfies Config;
