module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      racing: ["Racing Sans One"],
      roboto: ["Roboto"],
    },
    extend: {
      backgroundImage: (theme) => ({
        lagoon: "url(/src/assets/lagoon.svg)",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
