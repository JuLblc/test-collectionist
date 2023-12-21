/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        8:"8"
      },
      spacing: {
        '108': '27rem',
      },
    },
  },
  plugins: [],
}