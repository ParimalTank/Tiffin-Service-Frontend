const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "320px",
      sm: "500px",
      md: "768px",
      lg: "991px",
      xl: "1195px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
  },
  plugins: [],
});
