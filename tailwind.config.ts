import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: { marquee: "marquee 60s linear infinite" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazardor: {
          primary: "#15803d",
          "primary-content": "#ffffff",
          secondary: "#16a34a",
          accent: "#f59e0b",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f4f8f5",
          "base-300": "#e2ece5",
          info: "#0ea5e9",
          success: "#16a34a",
          warning: "#f59e0b",
          error: "#dc2626",
        },
      },
    ],
  },
};
export default config;
