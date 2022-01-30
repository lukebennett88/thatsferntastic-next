const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.tsx"],
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-named-groups"),
  ],
  theme: {
    ...defaultTheme,
    namedGroups: ["tpgi"],
    fontFamily: {
      ...defaultTheme.fontFamily,
      display: ["Courier Prime", "Courier New", ...defaultTheme.fontFamily["mono"]],
      mono: ["Courier Prime", "Courier New", ...defaultTheme.fontFamily["mono"]],
      sans: ["Montserrat", ...defaultTheme.fontFamily["sans"]],
    },
    extend: {
      colors: {
        gray: colors.gray,
        indigo: colors.indigo,
        aqua: colors.aqua,
        blue: colors.blue,
        green: colors.green,
        red: colors.red,
        yellow: colors.yellow,
        cyan: {
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
        },
        teal: {
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
        },
        pink: {
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
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
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
  variants: {
    animation: ["motion-safe", "motion-reduce"],
  },
};
