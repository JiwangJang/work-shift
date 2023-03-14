/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        header: "6%",
        content: "94%",
        registerInput: "50px",
        "1/3": "31%",
        table: "95%",
        "1/7": "14%",
        600: "600px",
        "1/10": "10%",
      },
      width: {
        800: "800px",
      },
      fontFamily: {
        smallTitle: ["small-title", "sans-serif"],
        article: ["article", "sans-serif"],
        calendertitle: ["calendertitle", "sans-serif"],
        date: ["date", "sans-serif"],
        workername: ["workername", "sans-serif"],
        loginPageTitle: ["loginPageTitle", "sans-serif"],
        loginPageArticle: ["loginPageArticle", "sans-serif"],
        popup: ["popup", "sans-serif"],
      },
      fontSize: {
        smalltitle: "2.5rem",
        "3xl-nolineheight": "1.875rem",
        calendertitle: "3.5rem",
        loginPageTitle: "6rem",
        LoginButton: "45px",
      },
      colors: {
        kakao: "#FEE500",
        naver: "",
        kakaoFont: "#3F3B15",
      },
    },
  },
  plugins: [],
};
