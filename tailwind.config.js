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
      }
    },
  },
  plugins: [],
};
