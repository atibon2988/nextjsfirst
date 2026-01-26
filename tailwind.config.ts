import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // <--- Dòng này quan trọng nhất để bật Dark Mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;