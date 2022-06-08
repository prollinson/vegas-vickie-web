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
        "header-dark": "url('/src/assets/header-bg.png')",
        "legacy-lounge": "url('/src/assets/legacy-lounge-bg.png')",
        "pattern": "url('/src/assets/pattern-bg.png')",
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
