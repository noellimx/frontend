/** @type {import('tailwindcss').Config} */

const grey = "#D9D9D9";
const cerise = "#DE3163";


const lavender = "#E6E6FA";
const lilac = "#C8A2C8"
const orchid = "#DA70D6";
const eggshellWhite = "#F0EAD6";
const mistyGrey = "#D3D3D3";
const amethyst = "#9966C";



export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      backgroundImage: {


        'logo-transparent': "url('/assets/forager-logo-transparent.png')",


      },
      colors: {
        delimiter: grey,
        debug: cerise,

        primaryDeep: orchid,
        primaryLight: lavender,
        primary: {
          default: lilac,
          light: lavender,
          deep: orchid

        },

        secondary: {

          default: mistyGrey,
          deep: amethyst,
          light: eggshellWhite
        }
      },
    },
  },
  plugins: [],
};
