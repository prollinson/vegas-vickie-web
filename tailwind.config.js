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
        "vegas-scene-dark": "url('/src/assets/background.png')",
      },
      fontFamily: {
        'gilroy': ['Gilroy', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
