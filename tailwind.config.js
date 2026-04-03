/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "denia-rose": "#fdf2f8",
        "denia-mint": "#aed4c5",
        "denia-mint-light": "#c1e0d4",
        "denia-mint-dark": "#8bb5a5",
        "denia-peach": "#eaaf87",
        "denia-peach-light": "#f0c4a3",
        "denia-peach-dark": "#d49466",
      },
      keyframes: {
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
