/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A",
        secondary: "#b5b5b5",
        tertiary: "#252525",
        burgundy: "#5A181C",
        "burgundy-dark": "#320B0D",
        "black-100": "#0E0E0E",
        "black-200": "#2C2C2C",
        "white-100": "#ffffff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px rgba(90, 24, 28, 0.3)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/content/banner-bg.png')",
      },
    },
  },
  plugins: [],
}
