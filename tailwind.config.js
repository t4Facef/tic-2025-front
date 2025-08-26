/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue1': '#BDEAFC',
        'blue2': '#219EBC',
        'blue3': '#023047',
        'blue4': '#9CDFFE',
        'orange1': '#FF950C',
        'orange2': '#FFDCAD'
      },
      fontFamily: {
        'georgia': 'Georgia, serif'
      }
    },
  },
  plugins: [],
}