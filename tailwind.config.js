/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue1': '#BDEAFC',
        'blue2': '#219EBC',
        'blue3': '#023047',
        'blue3H': '#054D71', //Hover para o blue3
        'blue4': '#9CDFFE',
        'blue5': '#64CEFF',
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