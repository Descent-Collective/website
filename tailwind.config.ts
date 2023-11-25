import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        },
        blue: {
          50: "#826CFF",
          100: "#BCFD00",
        },
        white: {
          50: "#FFFFFF",
        },
        green: {
          50: "#26A989",
          100: "#26A989",
        },
        grey: {
          50: "#979797",
          100: "#EAEAEA",
        },
      },
    },
  },
  plugins: [],
};
export default config;
