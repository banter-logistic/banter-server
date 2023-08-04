/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.svelte'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light","dark","light"],
  },
}

