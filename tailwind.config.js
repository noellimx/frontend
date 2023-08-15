/** @type {import('tailwindcss').Config} */

const grey = "#D9D9D9";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      delimiter: grey,
    },
  },
  plugins: [],
};
