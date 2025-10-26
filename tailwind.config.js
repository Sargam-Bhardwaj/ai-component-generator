/** @type {import('tailwindcss').Config} */
module.exports = {
  // This is the crucial line for our theme toggle to work
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

