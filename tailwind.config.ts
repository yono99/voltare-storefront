import type { Config } from "tailwindcss";

const config: Config = {
 content: ["./src/**/*.{ts,tsx}"],
 theme: {
 extend: {
 colors: {
 brand: {
 DEFAULT: "#E10600",
 dark: "#B00500",
 light: "#FF2A1F",
 },
 ink: {
950: "#0A0A0B",
900: "#111114",
800: "#1A1A1F",
700: "#26262E",
600: "#3A3A45",
500: "#5A5A68",
400: "#8A8A99",
300: "#B8B8C4",
200: "#DADAE2",
100: "#F2F2F5",
 },
 },
 fontFamily: {
 sans: ["var(--font-sans)", "system-ui", "sans-serif"],
 },
 boxShadow: {
 glow: "0001px rgba(225,6,0,0.4),012px40px -12px rgba(225,6,0,0.55)",
 },
 },
 },
 plugins: [],
};

export default config;
