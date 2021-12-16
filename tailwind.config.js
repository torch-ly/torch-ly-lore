module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'rgb(12,11,36)',
        "primary-light": '#171547',
        accent: 'rgb(247, 155, 63)',
        "text-light": '#f1f5f9',
        "text-dark": '#2f2f2f',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
