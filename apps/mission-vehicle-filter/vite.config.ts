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
        description:
          "Filtert die Fahrzeuge im Alarmfenster und zeigt nur ausgewählte an. Der Filter kann ein / ausgeschaltet werden, der Zustand wird lokal gespeichert.",
        updateURL: "https://github.com/Grisu118/lss-userscript/releases/latest/download/mission-vehicle-filter.user.js",
      },
    }),
    nxViteTsPaths(),
  ],
});
