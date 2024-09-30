import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        namespace: "lss.grisu118.ch",
        match: ["https://www.leitstellenspiel.de/missions/*"],
        license: "MIT",
        author: "Grisu118",
      },
    }),
  ],
});
