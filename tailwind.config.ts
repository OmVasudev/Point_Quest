import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlue1: "#4344FF",
        customBlue2: "#A1F5FF",
        //theme colors
        primary: {
          50: "#E1E2FF",
          100: "#B3B5FF",
          200: "#8588FF",
          300: "#575CFF",
          400: "#292FFF",
          500: "#0103FF", // base color
          600: "#0102CC",
          700: "#010299",
          800: "#000166",
          900: "#000033",
        },
        secondary: {
          50: "#E0FBFF",
          100: "#B3F7FF",
          200: "#85F3FF",
          300: "#57EFFF",
          400: "#29EBFF",
          500: "#01E4FF", // base color
          600: "#01B7CC",
          700: "#018A99",
          800: "#005C66",
          900: "#002F33",
        },
        accent: {
          50: "#E3E3F0",
          100: "#BDBDE1",
          200: "#9696D2",
          300: "#7070C3",
          400: "#4949B4",
          500: "#0A0B5C", // base color
          600: "#080949",
          700: "#060736",
          800: "#040524",
          900: "#020211",
        },
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 10s linear infinite",
      },
      fontFamily: {
        primary: ['"Reddit Sans"', "sans-serif"],
        secondary: ['"Redressed"', "cursive"],
      },

      images: {
        domains: ["your-image-host.com", "another-domain.com"], // Add your image host domains here
      },
    },
  },
  plugins: [daisyui],
};

export default config;
