/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    lineClamp: {
      8: "8"
    },
    spacing: {
      '108': '27rem',
    },
  },
};
export const plugins = [];