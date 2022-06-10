module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inverse-top': '4px 4px 0 #1f2937',
        'inverse-bottom': '4px -4px 0 #1f2937',
        'primary': ' rgba(234, 124, 105, 0.32) 0px 2px 4px 0px, rgba(234, 124, 105, 0.32) 0px 2px 16px 0px',
        'pink': 'rgba(255, 102, 153, 0.32) 4px 5px 33px 2px, rgba(255, 102, 153, 0.32) 0px -2px 15px 5px',
      },
      colors: {
        primary: '#EB966A'
      }
    },
  },
  plugins: [],
}
