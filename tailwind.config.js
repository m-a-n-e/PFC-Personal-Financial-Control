/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {

    extend: {
      fontFamily: {
        'archivo': ['Archivo Black', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      colors: {
        'pfcBlack': {
          100: '#131200',
        },
        'pfcFolly': {
          100: '#ff1053',
        },
        'pfcWhite': {
          100: '#fefdff',
          200: '#f9f9f9',
          300: '#f3f3f3',
        },
        'pfcViolet': {
          100: '#52528C',
        },
        'pfcUltra': {
          100: '#372554',
        },
      },
    },
  },
  plugins: [],
}

