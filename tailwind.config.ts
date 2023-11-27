import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        black: {
          50: "#000000",
          100: "#030303",
          150: "#181818",
          200: "#060703",
          250: "#474747",
        },
        blue: {
          50: "#826CFF",
          100: "#BCFD00",
          150: "#0052FF",
        },
        white: {
          50: "#FFFFFF",
          100: "#ECECEC",
          150: "#f8f8f8",
          200: "#FAFFFE",
          250: "#FCFCFC",
        },
        green: {
          50: "#26A989",
          100: "#26A989",
          150: "#95C900",
          200: "#F6F9F0",
          250: "#8EBF00",
          300: "#E7F7BA",
        },
        grey: {
          50: "#979797",
          100: "#EAEAEA",
          150: "#E3E3E3",
          200: "#4D4D4D",
          250: "#454545",
          300: "#2B2B2B",
          350: "#E6E6E6",
          400: "rgba(3, 3, 3, 0.32)",
          450: "#C5C5C5",
          500: "#909090",
          550: "#8D8D8D",
          600: "#545454",
          650: "#9F9F9F",
        },
        red: {
          50: "#FF7663",
        },
      },
    },
  },
  plugins: [],
};
export default config;
