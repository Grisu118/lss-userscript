import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://avatars.githubusercontent.com/u/4274139?s=40&v=4",
        namespace: "lss.grisu118.ch",
        match: ["https://www.leitstellenspiel.de/"],
        license: "MIT",
        author: "Grisu118",
        description: "Zusätziche Funktionen für die Karte",
      },
    }),
    nxViteTsPaths(),
  ],
});
