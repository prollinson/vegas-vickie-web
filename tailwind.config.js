module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'display': ['Gilroy', 'sans-serif'],
      'body': ['gilroy', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        "vegas-scene-dark": "url('/src/assets/background_vickie.jpg')"
      },
      fontFamily: {
        'gilroy': ['Gilroy', 'sans-serif'],
      },
      colors: {
        'vickie-yellow': '#F7CB56',
      }
    },
  },
  plugins: [],
}
