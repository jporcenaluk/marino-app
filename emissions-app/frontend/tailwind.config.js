/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['Indie Flower', 'serif'],  // For h1, h2, etc.
        body: ['Afacad Flux', 'sans-serif'],  // For the rest of the body text
      },
    },
  },
  plugins: [ require('daisyui') ],
}

