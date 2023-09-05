import plugin from "tailwindcss/plugin";
import * as tw from "./tailwind.js";
import form from "@tailwindcss/forms";

const {
  colors,
  padding,
  util,
  width,
  base,
  objMap,
  component
} = tw

/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.svelte","../lib/cp/**/*.svelte"],
  theme: {
    extend: {
      colors,
      padding,
      width,
    },
  },
  plugins: [
    form({ strategy: 'class' }),
    plugin(function({ addComponents, addBase, matchUtilities, theme }) {

      util.map( ([key,match,values]) =>{
        // @ts-ignore
        matchUtilities({ [key]: match },{ values })
      })
      
      addComponents(objMap(component,(k,v)=>[`.${k}`,v]))
      addBase(base(theme))
    }),
  ],
}

