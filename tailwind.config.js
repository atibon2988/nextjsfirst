/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- DÒNG QUAN TRỌNG NHẤT
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
