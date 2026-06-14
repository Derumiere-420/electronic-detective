import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: "/detective/",
  plugins: [react({ jsxRuntime: "classic" })],
  define: {
    global: "globalThis",
    "process.env.NODE_ENV": JSON.stringify(
      mode === "production" ? "production" : "development"
    ),
    "process.env.PUBLIC_URL": JSON.stringify("/detective")
  },
  test: {
    globals: true,
    setupFiles: "./src/setupTests.js",
    server: {
      deps: {
        inline: ["material-ui"]
      }
    }
  }
}));
