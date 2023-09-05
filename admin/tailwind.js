import { blue, gray, indigo, neutral, red, slate, white } from "tailwindcss/colors";
import svgToDataUri from "mini-svg-data-uri";
import theme, {
  outlineWidth,
  borderWidth,
  boxShadow,
  fontSize,
  fontWeight,
  borderRadius,
  spacing
} from "tailwindcss/defaultTheme.js";

const lerp = (a, b, t) => a + (b - a) * t 
const invLerp = (a, b, v) => (v - a) / (b - a)
const remap = (o1, o2, i1, i2, v) => lerp(o1, o2, invLerp(i1, i2, v))
const arr = (len,each) => Array(len).fill(0).map((_,i) => each(i+1));
const arrz = (len,each) => Array(len).fill(0).map((_,i) => each(i));
const s = (any,val) => any ? '' : val
const isInt = val => /\D/.test(val)
const pair = val => [val,val]
export const objArr = (len,each) => Object.fromEntries(arr(len,each))
export const objArrz = (len,each) => Object.fromEntries(arrz(len,each))
export const objMap = (ob,cb) => Object.fromEntries(Object.entries(ob).map(([k,v])=>cb(k,v)))


function resolveColor(color, opacityVariableName) {
  return color.replace('<alpha-value>', `var(${opacityVariableName}, 1)`)
}

// THEME

const vars = /** @type {typeof light} */(new Proxy({},{get(_,key){return `var(--${/**@type {string}*/(key)})`}}))
const light = {
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

// ATOM

export const colors = light

export const padding = {
  "input": '.4rem .7rem',
  "input-md": '1rem 0.75rem',
  "btn": '.7rem 1.2rem',
}

export const width = {
  "main": "min(840px,100%)",
  ...objArr(10,i => [`break-${i}`,`min(${i*120}px, 100%)`])
}

// UTIL

const colorUtil = (prop) => [
  (col) => {
    const val = remap(100, 255, 10, 90, col)
    return {
      [prop]: `rgb(${val},${val},${val})`
    }
  },
  objArr(9,i => [i*10,i*10])
]

const dynamicShading = (prop) => [
  (stat)=>{
    
    const [wh,bl] = stat.split('-')
    
    return {
      "--col": `color-mix(in oklab, ${vars.primary} 100%, white ${wh||0}%)`,
      [prop]: `color-mix(in oklab, var(--col) 100%, black ${bl||0}%)`
    }
  },
  {
    DEFAULT: '',
    ...Object.fromEntries(arr(9, i => 
      arr(9, j => pair(`${i*10}-${j*10}`))
    ).flat()),
    ...objArr(9,i => pair(`-${i*10}`)),
    ...objArr(9,i => pair(`${i*10}`)),
  }
]

export const util = [
  // text-state-10 => text-state-90
  ["text-state",...colorUtil('color')],
  
  // bg-state-10 => bg-state-90
  ["bg-state",...colorUtil('background')],
  
  // text-primary-1/2
  ["text-primary",...dynamicShading('color')],
  
  // text-primary-1/2
  ["bgs-primary",...dynamicShading('background')],
  
  // stack => stack-1 => stack-2-4 => stack-[1fr_1rem-4]
  ["stack",(cn) => {
    const [cols,gap] = cn.split('-')
    
    const ob = {
      display: "grid",
      gridTemplateColumns: isInt(cols) ? cols : `repeat(${parseInt(cols)}, minmax(0, 1fr))`,
    }
    
    gap && (ob.gap = `${ parseInt(gap) * .25 }rem`);
    
    return ob
  },{
    DEFAULT: '1-0',
    ...objArr(6, i => [i,i+''] ),
    ...Object.fromEntries(
      arr(6, i => arr(14, 
        j => pair(`${i}-${j}`) )
      ).flat()
    )
  }],
]

// COMPONENT

const btn = {
  padding: padding["btn"],
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


const card = {
  borderRadius: borderRadius.sm,
  boxShadow: boxShadow.md,
  padding: '1.5rem',
  background: 'white',
}


const input = {
  borderRadius: borderRadius.sm,
  padding: padding.input,
  borderWidth: borderWidth.DEFAULT,
  borderColor: slate[400],
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

export const component = { btn, card, input }

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
  },
  ":root": objMap(light,(k,v)=>['--'+k,v])
  
})

