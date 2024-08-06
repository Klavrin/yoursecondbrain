import {nextui} from '@nextui-org/theme';
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [nextui()],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|navbar|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {}
    }
  }
}
