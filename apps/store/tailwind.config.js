// @ts-check
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const cyan = {
  50: "#ebfcff",
  100: "#e1fafe",
  200: "#c3f4fd",
  300: "#a4f1fe",
  400: "#76e6fa",
  500: "#3fdcf8",
  600: "#1cd2f2",
  700: "#1abedb",
  800: "#1e8c9f",
  900: "#236a76",
};

const teal = {
  50: "#edfafa",
  100: "#d5f5f6",
  200: "#afeeef",
  300: "#7ee0e2",
  400: "#16c7ca",
  500: "#069fa2",
  600: "#047f81",
  700: "#037072",
  800: "#055b5c",
  900: "#015051",
};

const pink = {
  50: "#fdf2f9",
  100: "#fce8f4",
  200: "#fad2ea",
  300: "#f8b4dd",
  400: "#f17ec3",
  500: "#e746a7",
  600: "#d61f8d",
  700: "#bf127a",
  800: "#991564",
  900: "#751a51",
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "../../packages/*/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        indigo: colors.indigo,
        cyan,
        teal,
        pink,
      },
      fontFamily: {
        mono: ["Courier Prime", "Courier New", ...defaultTheme.fontFamily["mono"]],
        sans: ["Montserrat", ...defaultTheme.fontFamily["sans"]],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4": {
              color: theme("colors.pink.500"),
              fontWeight: theme("fontWeight.medium"),
            },
            "img": {
              width: theme("width.full"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio"), require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
