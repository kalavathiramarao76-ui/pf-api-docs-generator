module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b3f54",
        secondary: "#6c7293",
        accent: "#8b9467",
        success: "#34c759",
        warning: "#ffc107",
        error: "#ff5c5c",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            a: {
              color: "#337ab7",
              "&:hover": {
                color: "#23527c",
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};