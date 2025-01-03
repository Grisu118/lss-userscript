import "./style.css";
import { renderMenuBtn } from "./menu/MenuButton";
import { renderModal } from "./menu/Modal";

(() => {
  if (!map) {
    console.warn("No map found, disabling enhanced map");
    return;
  }
  renderModal();
  renderMenuBtn();
})();
