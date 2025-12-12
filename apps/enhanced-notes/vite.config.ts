import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: "src/main.ts",
      userscript: {
        icon: "https://avatars.githubusercontent.com/u/4274139?s=40&v=4",
        namespace: "lss.grisu118.ch",
        match: ["https://www.leitstellenspiel.de/note", "https://www.leitstellenspiel.de/buildings/*"],
        license: "MIT",
        author: "Grisu118",
        description: "Improves notes page and add notes to buildings",
        updateURL: "https://github.com/Grisu118/lss-userscript/releases/latest/download/enhanced-notes.user.js",
      },
    }),
    nxViteTsPaths(),
  ],
});
