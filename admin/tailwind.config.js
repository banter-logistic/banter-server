import plugin from "tailwindcss/plugin";
import { indigo, neutral, slate, white } from "tailwindcss/colors";
import { outlineWidth, borderWidth, fontSize, fontWeight } from "tailwindcss/defaultTheme.js";

const colors = {
  "primary": indigo[600],
  "primary-active": indigo[700],
  "primary-content": white,
  // "base": slate[100],
  "base": neutral[100],
  "text-base": slate[700],
}

const input_padding = '.7rem 1.2rem';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.svelte"],
  theme: {
    extend: {
      colors,
      padding: {
        "input": input_padding,
        "input-md": '1rem 0.75rem',
      }
    },
  },
  plugins: [
    plugin(function({ addComponents, theme, addBase }) {
      addComponents({
        '.btn': {
          padding: input_padding,
          borderRadius: '0.25rem',
          fontWeight: '700',
          '&.primary': {
            background: colors.primary,
            color: colors["primary-content"],
            '&:active': {
              background: colors['primary-active'],
            }
          },
          '&:active': {
            border: 'none'
          }
        },
        ".card": {
          borderRadius: theme('borderRadius.xl'),
          boxShadow: theme('boxShadow.md'),
          padding: '2rem',
          background: 'white',
        },
        ".input": {
          // @apply rounded-md border border-slate-300 px-4 py-3 hover:border-slate-400,
          borderRadius: theme('borderRadius.xl'),
          padding: input_padding,
          borderWidth: borderWidth.DEFAULT,
          borderColor: slate[300],
          "&:hover": {
            // "@apply outline-none border-slate-300"
          },
          "&:focus": {
            // '@apply outline outline-slate-300 outline-offset-1'
            outlineWidth: outlineWidth[1],
            outlineStyle: 'solid',
            outlineColor: slate[300],
            outlineOffset: '1px'
          }
        }
      })
      
      addBase({
        h1: {
          fontSize: fontSize["4xl"][0],
          lineHeight: fontSize["4xl"][1],
          fontWeight: fontWeight.bold
        },
        h2: {
          fontSize: fontSize["2xl"][0],
          lineHeight: fontSize["2xl"][1],
          fontWeight: fontWeight.bold
        },
      })
    }),
  ],
}

