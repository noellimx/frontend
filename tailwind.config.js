/** @type {import('tailwindcss').Config} */

const grey = "#D9D9D9";
const cerise = "#DE3163";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      colors: {
        delimiter: grey,
        debug: cerise,
      }


    },

  },
  plugins: [],
};
