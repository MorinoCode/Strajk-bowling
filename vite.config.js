import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",


    include: ["src/**/*.test.jsx"],

    eexclude: [
      "src/main.jsx",
      "src/App.jsx",
      "src/router.jsx",
      "src/**/*.scss",
      "src/**/*.svg",
    ],
  },
});
