import "./style.css";
import { BuildingApp } from "./buildings/app";
import { NotesApp } from "./notes/app";

(async () => {
  if (location.pathname.endsWith("/note")) {
    NotesApp();
  } else if (location.pathname.startsWith("/buildings")) {
    BuildingApp();
  }
})();
