const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './src/index.html'],
  theme: {
    extend: {
      colors: {
        brand: colors.blue,
        success: colors.emerald,
        danger: colors.rose,
        warning: colors.amber
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
}
