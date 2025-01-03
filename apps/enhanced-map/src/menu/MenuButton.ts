import { ID as MODAL_ID } from "./Modal";

const ID = "LSS_LS42_EHM_MENU_BTN";

export const renderMenuBtn = () => {
  const existingBtn = document.getElementById(ID);

  if (!existingBtn) {
    // create btn if not yet existing
    const bottomLeft = document.querySelector<HTMLDivElement>("#map .leaflet-bottom.leaflet-left");
    if (!bottomLeft) {
      throw new Error("No leaflet map found.");
    }
    const bar = document.createElement("div");
    bar.classList.add("leaflet-bar");
    bar.classList.add("leaflet-control");

    const btn = document.createElement("a");
    btn.id = ID;
    btn.innerText = "EHM";
    btn.role = "button";
    btn.href = "#";
    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", `#${MODAL_ID}`);
    bar.append(btn);
    bottomLeft.appendChild(bar);
  }
};
