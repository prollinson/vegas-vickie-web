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
        "vegas-scene-dark": "url('/src/assets/background_vickie.jpg')",
        "neon-bg": "url('/src/assets/neon-bg.png')",
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
