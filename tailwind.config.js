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
        "header-dark": "url('/src/assets/header-bg_lossyalpha.webp')",
        "header-dark-small": "url('/src/assets/header-bg_640x_lossyalpha.webp')",
        "legacy-lounge": "url('/src/assets/legacy-lounge-bg_lossyalpha.webp')",
        "pattern": "url('/src/assets/pattern-bg_lossyalpha.webp')",
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
