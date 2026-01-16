/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0D12',
          800: '#13151C',
          700: '#1A1E28',
          600: '#252530',
        },
      }
    },
  },
  plugins: [],
}