/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // garante que Tailwind escaneie tudo na pasta src
  ],
  theme: {
    extend: {
      colors: {
        'blue1': '#BDEAFC',
        'blue2': '#219EBC',
        'blue3': '#023047',
        'blue4': '#9CDFFE'
      },
      fontFamily: {
        'georgia': 'Georgia, serif'
      }
    },
  },
  plugins: [],
}