/** @type {import('tailwindcss').Config} */

const grey = "#D9D9D9";
const cerise = "#DE3163";

const lavender = "#E6E6FA";
const lilac = "#C8A2C8";
const orchid = "#DA70D6";
const eggshellWhite = "#F0EAD6";
const mistyGrey = "#D3D3D3";
const amethyst = "#9966CC";

const primary = {
  default: lilac,
  light: lavender,
  deep: orchid,
}

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "logo-transparent": "url('/assets/forager-logo-transparent.png')",
      },
      colors: {
        delimiter: grey,
        debug: cerise,

        primaryDeep: orchid,
        primaryLight: lavender,
        primary,

        secondary: {
          default: mistyGrey,
          deep: amethyst,
          light: eggshellWhite,
        },

        background: {
          default: primary.light
        }
      },
    },
  },
  plugins: [],
};
