const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      racing: ["Racing Sans One"],
      roboto: ["Roboto"],
    },
    extend: {
      screens: { xs: "560px", ...defaultTheme.screens },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
