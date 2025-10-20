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
        'blue5H': '#85D8FF',
        'blue5': '#64CEFF',
        'red1': '#FF7979',
        'red2': '#CA0000'
      },
      fontFamily: {
        'georgia': 'Georgia, serif',
        'nunito': ['"Nunito"', 'sans-serif']
      }
    },
  },
  plugins: [],
}