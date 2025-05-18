/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/datafiles/**/*.{js,ts,jsx,tsx}",
    "./src/App.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        caveat: ['"Caveat"', 'cursive'],
        knewave: ['"Knewave"', 'cursive'],
        meow: ['"Meow Script"', 'cursive'],
        pacifico: ['"Pacifico"', 'cursive'],
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
      },
    },
  },
  plugins: [],
};
