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
        primary: "#281918",
        secondary: "#f2f2f2",
        tertiary: "#4a0a0c",
        "black-100": "#000000",
        "black-200": "#302f30",
        "white-100": "#ffffff",
      },
      boxShadow: {
        card: "0px 35px 120px -15pxrgb(34, 4, 5)",
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
