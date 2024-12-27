/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F39C12",
        secondary: "#C0392B",
        supporting_gray: "#494949",
        supporting_blue: "#2980B9",
      }
    },
  },
  plugins: [],
};

