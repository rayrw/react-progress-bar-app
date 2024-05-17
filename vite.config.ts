import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      app: path.resolve("src/app"),
      common: path.resolve("src/common"),
      features: path.resolve("src/features"),
    },
  },
  plugins: [
    svgr({
      include: "**/*.svg",
    }),
    react(),
  ],
});
