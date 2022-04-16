module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    fontFamily: {
      'display': ['gilroy', 'sans-serif'],
      'body': ['gilroy', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        "vegas-scene-dark": "url('/src/assets/background.png')",
      },
      fontFamily: {
        'gilroy': ['Gilroy-Regular','Gilroy-Bold','Gilroy-Black']
      },
    },
  },
  plugins: [],
}
