import { indigo, neutral, slate, white } from "tailwindcss/colors";
import {
  outlineWidth,
  borderWidth,
  boxShadow,
  fontSize,
  fontWeight,
  borderRadius
} from "tailwindcss/defaultTheme.js";


export const colors = {
  "primary": indigo[600],
  "primary-active": indigo[700],
  "primary-content": white,
  "base": neutral[100],
  "text-base": slate[700],
}

export const padding = {
  "input": '.7rem 1.2rem',
  "input-md": '1rem 0.75rem',
}


export const btn = {
  padding: padding.input,
  borderRadius: '0.25rem',
  fontWeight: '700',
  '&.primary': {
    background: colors.primary,
    color: colors["primary-content"]
  },
  '&:active': {
    background: colors['primary-active'],
    border: 'none',
    outline: 'none',
  },
  '&:disabled': {
    background: neutral['600'],
  },
}


export const card = {
  borderRadius: borderRadius.xl,
  boxShadow: boxShadow.xl,
  padding: '2rem',
  background: 'white',
}


export const input = {
  // @apply rounded-md border border-slate-300 px-4 py-3 hover:border-slate-400,
  borderRadius: borderRadius.xl,
  padding: padding.input,
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
  },
  "&:disabled": {
    background: neutral['300']
  }
}

export const base = {
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
}

