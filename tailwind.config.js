module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3A3D41",
        secondary: "#8B9467",
        accent: "#34C759",
        background: "#1A1D23",
        backgroundLight: "#2F343A",
        text: "#FFFFFF",
        textSecondary: "#B1B5B8",
        textMuted: "#6C6F73",
        success: "#34C759",
        warning: "#F7DC6F",
        error: "#FF6F6F",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#FFFFFF",
            a: {
              color: "#34C759",
              "&:hover": {
                color: "#2F343A",
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