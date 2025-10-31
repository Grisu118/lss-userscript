import "./style.css";
import { NotesApp } from "./notes/app";

(async () => {
  if (location.pathname.endsWith("/note")) {
    NotesApp();
  }
})();
