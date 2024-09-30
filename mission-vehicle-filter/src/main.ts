import "./style.css";
import { StorageProvider } from "@lightspots/storageprovider";

(() => {
  const storageKey = "MVF_FILTER_ENABLED";
  const storage = StorageProvider.localStorage("ls42.lss");

  function getState(): boolean {
    return storage.getAsBoolean(storageKey) ?? false;
  }

  function setIcon(icon: HTMLSpanElement, filterEnabled: boolean) {
    if (filterEnabled) {
      icon.className = "glyphicon glyphicon-ok-circle";
    } else {
      icon.className = "glyphicon glyphicon-remove-circle";
    }
  }

  function filterVehicleList() {
    const enabled = getState();
    document
      .querySelector<HTMLElement>(".tab-pane.active table tbody")
      ?.querySelectorAll<HTMLTableRowElement>("tr")
      ?.forEach((elem) => {
        if (enabled) {
          if (
            elem.querySelector<HTMLInputElement>(".vehicle_checkbox")
              ?.checked === true
          ) {
            // row is selected, so show it
            elem.style.display = "";
          } else {
            // row is not selected, so hide it
            elem.style.display = "none";
          }
        } else {
          elem.style.display = "";
        }
      });
  }

  // add btn to toggle filter state
  const dispatchBtnGroup = document.getElementById("dispatch_buttons");
  if (dispatchBtnGroup == null) {
    console.error("Could not find dispatch btn group");
    return;
  }

  const btn = document.createElement("a");
  btn.className = "btn btn-success";
  btn.href = "#";

  const filterIcon = document.createElement("span");
  filterIcon.className = "glyphicon glyphicon-filter";
  btn.append(filterIcon);

  const statusIcon = document.createElement("span");
  setIcon(statusIcon, getState());
  btn.append(statusIcon);

  dispatchBtnGroup.prepend(btn);

  btn.addEventListener("click", () => {
    const enabled = getState();

    storage.set(storageKey, !enabled);
    setIcon(statusIcon, !enabled);
    filterVehicleList();
  });

  document.querySelectorAll<HTMLAnchorElement>(".btn.aao").forEach((elem) => {
    elem.addEventListener("click", filterVehicleList);
  });

  document
    .getElementById("tabs")
    ?.querySelectorAll("li")
    ?.forEach((elem) => {
      elem.addEventListener("click", filterVehicleList);
    });

  filterVehicleList();
})();
