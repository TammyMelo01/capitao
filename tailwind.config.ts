import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f172a",
        police: "#1d4ed8",
        success: "#16a34a",
        warning: "#f59e0b"
      }
    }
  },
  plugins: []
};

export default config;
