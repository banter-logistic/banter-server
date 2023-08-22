import plugin from "tailwindcss/plugin";
import * as tw from "./tailwind.js";

const { colors, padding, base, ...cp } = tw

/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.svelte"],
  theme: {
    extend: {
      colors,
      padding
    },
  },
  plugins: [
    plugin(function({ addComponents, theme, addBase }) {
      addComponents(Object.fromEntries(Object.entries(cp).map( ([k,v]) => ['.' + k,v] )))
      addBase(base)
    }),
  ],
}

