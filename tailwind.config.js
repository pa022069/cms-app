/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/**/*.{js,ts,jsx,tsx}', './libs/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        full: '100%',
        half: '50%',
      },
    },
  },
  plugins: [],
};
