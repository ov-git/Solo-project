/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        dGreen: "#248232",
        dDarkGreen: "#264653",
        dLightGreen: "#2a9d8f",
        dYellow: "#e9c46a",
        dDarkOrange: "#e76f51",
        dLightOrange: "#f4a261",
      },
    },
  },
  plugins: [],
};
