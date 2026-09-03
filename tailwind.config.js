/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5F3EE",
        surface: "#FFFFFF",
        ink: "#20241F",
        muted: "#6B7268",
        line: "#DEDACD",
        pine: "#33493B",
        pineDark: "#233129",
        amber: "#E0983F",
        rust: "#B24E3A",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
      },
      borderRadius: {
        card: "6px",
      },
    },
  },
  plugins: [],
};


