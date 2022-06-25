/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: process.env.TAILWIND_MODE ? 'jit' : '',
  darkMode: false,
  purge: [
    "./src/app/**/*.{ts,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
