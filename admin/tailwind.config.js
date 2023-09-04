import plugin from "tailwindcss/plugin";
import * as tw from "./tailwind.js";
import form from "@tailwindcss/forms";

const { colors, padding, base, util, width, lerp, invLerp, remap, ...cp } = tw

const arr = (len,each) => Array(len).fill(0).map((_,i) => each(i));

/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.svelte","../lib/cp/**/*.svelte"],
  theme: {
    extend: {
      colors,
      padding,
      width
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
      
      matchUtilities({
        "text-state": (col) => {
          const offset = 100
          const val = remap(10, 90, offset, 255, col)
          return {
            color: `rgb(${val},${val},${val})`
          }
        }
      }, { values: {
        ...Object.fromEntries(
          arr(9,i=>[(i+1)*10,(i+1)*10])
        )
      }})
      
      matchUtilities({
        "bg-state": (col) => {
          const offset = 100
          const val = remap(10, 90, offset, 255, col)
          return {
            background: `rgb(${val},${val},${val})`
          }
        }
      }, { values: {
        ...Object.fromEntries(
          arr(9,i=>[(i+1)*10,(i+1)*10])
        )
      }})
      
      addUtilities(Object.fromEntries(Object.entries(util).map( ([k,v]) => ['.' + k,v] )))
      addComponents(Object.fromEntries(Object.entries(cp).map( ([k,v]) => ['.' + k,v] )))
      addBase(base(theme))
    }),
  ],
}

