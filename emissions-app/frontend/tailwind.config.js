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
      backgroundColor: {
        customBlue: '#264677',
      },
      textColor: {
        customWhite: '#e6e6e6',
      },
      colors: {
        primaryButton: '#cad9ff',
        'primary-dark': '#527dbe',
        'secondary': '#3d6db2',
        'secondary-dark': '#36619f',
      }
    },
  },
  plugins: [ require('daisyui') ],
}

