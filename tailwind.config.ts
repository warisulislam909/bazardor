import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { market: "#176b45", cream: "#f7f7f0", ink: "#183328" }, boxShadow: { soft: "0 8px 30px rgba(20,60,40,.07)" } } }, plugins: [] }; export default config;
