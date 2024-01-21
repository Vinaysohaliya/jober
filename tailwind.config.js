/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,scss}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#EEE2DC",
        sec:"#EDC7B7"
      }
    },
  },
  plugins: [],
}
