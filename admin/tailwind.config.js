import plugin from "tailwindcss/plugin";
import * as tw from "./tailwind.js";
import form from "@tailwindcss/forms";

const { colors, padding, base, util, ...cp } = tw

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
    form({ strategy: 'class' }),
    plugin(function({ addComponents, addUtilities, addBase, matchUtilities, theme }) {
      matchUtilities({
        stack:(cn)=>{
          const ob = {
            display: "grid",
            gridTemplateColumns: `repeat(${cn[0]}, minmax(0, 1fr))`,
          }
          cn[1] && (ob.gap = `${/** @type {number} */(cn[1])*.25}rem`)
          return ob
        }
      },{ values: {
        DEFAULT: [1,0],
        ...Object.fromEntries(Array(6).fill(0)
          .map((_,i)=>{
            return Array(14).fill(0).map((_,e)=>/** @type {[string,[number,number]]} */([`${i+1}${e == 0 ? '' : '-'+e}`,[i+1,e]]))
          }).flat()
        )}
      })
      
      addUtilities(Object.fromEntries(Object.entries(util).map( ([k,v]) => ['.' + k,v] )))
      addComponents(Object.fromEntries(Object.entries(cp).map( ([k,v]) => ['.' + k,v] )))
      addBase(base(theme))
    }),
  ],
}

