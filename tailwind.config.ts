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
        },
        green: {
          50: "#26A989",
          100: "#26A989",
          150: "#95C900",
        },
        grey: {
          50: "#979797",
          100: "#EAEAEA",
          150: "#E3E3E3",
          200: "#4D4D4D",
          250: "#454545",
          300: "#2B2B2B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
