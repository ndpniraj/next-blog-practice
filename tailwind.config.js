/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1f1f1f",
        "secondary-dark": "#333333",
        "high-contrast-dark": "#ffffff",
        "low-contrast-dark": "#9CA3AF",
        primary: "#ffffff",
        secondary: "#f2f2f2",
        "high-contrast": "#374868",
        "low-contrast": "#737F95",
      },
      fontFamily: {
        "ibm_plex-500": ["ibm_plex-500", "serif"],
        "ibm_plex-400": ["ibm_plex-400", "serif"],
        SourceCodePro: ["SourceCodePro", "mono"],
      },
      transitionProperty: {
        height: "height",
        width: "width",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
