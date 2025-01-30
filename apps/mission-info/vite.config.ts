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
        match: ["https://www.leitstellenspiel.de/missions/*"],
        license: "MIT",
        author: "Grisu118",
        description: "Zeigt details zum Einsatz an, u.a. Kategorie, Generierungszeitpunkt & erwartete Einnahmen",
      },
    }),
    nxViteTsPaths(),
  ],
});
