import { blue, gray, indigo, neutral, red, slate, white } from "tailwindcss/colors";
import svgToDataUri from "mini-svg-data-uri";
import {
  outlineWidth,
  borderWidth,
  boxShadow,
  fontSize,
  fontWeight,
  borderRadius,
  spacing
} from "tailwindcss/defaultTheme.js";

function resolveColor(color, opacityVariableName) {
  return color.replace('<alpha-value>', `var(${opacityVariableName}, 1)`)
}

export const colors = {
  "primary": indigo[600],
  "primary-active": indigo[700],
  "primary-content": white,
  "base": neutral[100],
  "text-base": slate[700],
  
  "info": blue[200],
  "info-content": blue[700],
  "success": "#36d399",
  "warning": "#fbbd23",
  "error": "#f87272",
}

export const padding = {
  "input": '.7rem 1.2rem',
  "input-md": '1rem 0.75rem',
}

export const util = {
  
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
  boxShadow: boxShadow.md,
  padding: '2rem',
  background: 'white',
}


export const input = {
  borderRadius: borderRadius.xl,
  padding: padding.input,
  borderWidth: borderWidth.DEFAULT,
  borderColor: slate[300],
  // "&:hover": {},
  "&:focus": {
    outlineWidth: outlineWidth[1],
    outlineStyle: 'solid',
    outlineColor: slate[300],
    outlineOffset: '1px'
  },
  "&:disabled": {
    background: neutral['300']
  }
}

export const base = (theme) => ({
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
  select: {
    appearance: 'none',
    'background-image': `url("${svgToDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="${resolveColor(
        theme('colors.gray.500', gray[500]),
        '--tw-stroke-opacity'
      )}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
    )}")`,
    'background-position': `right ${spacing[2]} center`,
    'background-repeat': `no-repeat`,
    'background-size': `1.5em 1.5em`,
    background: 'transparent',
    'padding-right': spacing[10],
    'print-color-adjust': `exact`,
  }
})

