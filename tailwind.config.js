/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-bg": "url('./src/assets/images/Sign-In.jpg')", 
        "signup-bg": "url('./src/assets/images/Sign-Up.jpg')", 
      },
      colors: {
        primary: "#F15A24",
        secondary: "#FAB328",
        supporting_gray: "#494949",
        supporting_blue: "#2980B9",
        supporting_green: "#02411D",
      },
      fontFamily: {
        givonic: ["Givonic", "sans-serif"],
      },
      fontWeight: {
        "givonic-regular": 400,
        "givonic-semibold": 600,
        "givonic-bold": 700,
      },
    },
  },
  plugins: [],
};
