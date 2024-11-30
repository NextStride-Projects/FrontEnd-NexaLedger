import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#30733F",
        primaryColorDark: "#1C4525",
        whiteColor: "#ffffff",
        grayColor: "#e5e7eb"
      },
    },
  },
  plugins: [],
} satisfies Config;
