import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#032b91",
          dark: "#021f6b",
          light: "#0a3db8",
        },
        secondary: {
          DEFAULT: "#1488db",
          dark: "#0f6bb0",
          light: "#3da3e8",
        },
      },
    },
  },
  plugins: [],
};

export default config;
