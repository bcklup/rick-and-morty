import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0, 176, 207)",
        bgColor: "rgb(255, 254, 239)",
      },
    },
  },
  plugins: [],
};
export default config;
