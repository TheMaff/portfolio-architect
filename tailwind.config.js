/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0f172a', // Un azul oscuro muy "Premium/Tech"
        'brand-accent': '#3b82f6', 
      },
    },
  },
  plugins: [],
}