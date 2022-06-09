module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inverse-top': '4px 4px 0 #1f2937',
        'inverse-bottom': '4px -4px 0 #1f2937',
        'primary': ' rgba(234, 124, 105, 0.32) 0px 2px 4px 0px, rgba(234, 124, 105, 0.32) 0px 2px 16px 0px'
      },
      colors: {
        primary: '#EB966A'
      }
    },
  },
  plugins: [],
}
