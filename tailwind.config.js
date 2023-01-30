/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      lineHeight: {
        '12': '3rem',
        '26': '6.5rem'
      },
      width: {
        '22': '5.5rem',
        '26': '6.5rem',
        '50': '12.5rem'
      },
      minWidth: {
        '70': '4.375rem',
        '78': '4.875rem'
      },
      height: {
        '22': '5.5rem',
        '26': '6.5rem'
      },
      top: {
        '0.5': '0.125rem'
      },
      left: {
        '0.5': '0.125rem',
        '50': '12.5rem'
      },
      zIndex: {
        '1001': '1001',
        '1010': '1010'
      },
      margin: {
        '21': '5.25rem',
        '50': '12.5rem'
      },
      padding: {
        '21': '5.25rem',
        '50': '12.5rem'
      },
      colors: {
        'ffd344': '#ffd344',
        '648cff': '#648cff',
        'ff7970': '#ff7970',
        'ffb53c': '#ffb53c',
        '4fccb0': '#4fccb0'
      }
    }
  },
  plugins: []
}
