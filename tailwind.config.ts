import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0a0c16",
        dusk: "#151129",
        nebula: "#231a3d",
        ember: "#ff6a3d",
        emberDim: "#c94f2c",
        mist: "#c9c6d8",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(120% 100% at 78% 15%, #2a1f47 0%, #171129 38%, #0a0c16 75%)",
      },
    },
  },
  plugins: [],
};
export default config;
