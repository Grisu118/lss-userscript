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
        match: ["https://www.leitstellenspiel.de/vehicles/*"],
        license: "MIT",
        author: "Grisu118",
        description:
          "Verbessertes Stauts 5 Seite, deaktiviert Krankenhäuser die gewisse voraussetzungen nicht erfüllen (Distanz, Kosten, Fachabteilungen). ",
      },
    }),
  ],
});