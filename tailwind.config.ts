import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: "320px",
      tablet: "640px",
      "tablet-large": "768px",
      desktop: "1220px",
      "desktop-fullscreen": "1756px",
    },

    colors: {
      red: "#FC4747",
      "dark-blue": "#10141E",
      "light-blue": "#5A698F",
      white: "#FFFFFF",
      blue: "#161D2F",
      grey: "#817D92",
    },

    fontFamily: {
      primary: ["Outfit", "sans-serif"],
    },

    spacing: {
      0: "0",
      4: "4px",
      8: "8px",
      10: "10px",
      12: "12px",
      16: "16px",
      18: "18px",
      22: "22px",
      24: "24px",
      28: "28px",
      32: "32px",
      40: "40px",
      48: "48px",
      56: "56px",
      64: "64px",
      66: "66px",
      72: "72px",
      80: "80px",
      96: "96px",
      108: "108px",
      152: "152px",
      220: "220px",
      240: "240px",
    },

    extend: {
      borderRadius: {
        xl: "20px",
      },
      height: {
        "90%": "90vh",
      },
    },
  },
  plugins: [],
} satisfies Config;
