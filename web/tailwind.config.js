/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.svelte'],
  theme: {
    extend: {},
  },
   fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
  plugins: [require('daisyui')],
}

