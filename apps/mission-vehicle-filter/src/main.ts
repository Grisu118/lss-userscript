import { getVehicleFilterEnabled, setVehicleFilterEnabled } from "@lss/storage";

(() => {
  function setIcon(icon: HTMLSpanElement, filterEnabled: boolean) {
    if (filterEnabled) {
      icon.className = "glyphicon glyphicon-ok-circle";
    } else {
      icon.className = "glyphicon glyphicon-remove-circle";
    }
  }

  function filterVehicleList() {
    const enabled = getVehicleFilterEnabled();
    document
      .querySelector<HTMLElement>(".tab-pane.active table tbody")
      ?.querySelectorAll<HTMLTableRowElement>("tr")
      ?.forEach((elem) => {
        if (enabled) {
          if (elem.querySelector<HTMLInputElement>(".vehicle_checkbox")?.checked === true) {
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
  setIcon(statusIcon, getVehicleFilterEnabled());
  btn.append(statusIcon);

  dispatchBtnGroup.prepend(btn);

  let isApplyingFilter = false;
  let scheduledFrame = 0;
  let activeTbodyObserver: MutationObserver | undefined;

  const disconnectActiveObserver = () => {
    activeTbodyObserver?.disconnect();
    activeTbodyObserver = undefined;
  };

  const getActiveTableBody = () => document.querySelector<HTMLElement>(".tab-pane.active table tbody");

  const applyFilterSafely = () => {
    if (isApplyingFilter) {
      return;
    }

    isApplyingFilter = true;
    try {
      filterVehicleList();
    } finally {
      isApplyingFilter = false;
    }
  };

  const scheduleFilterVehicleList = () => {
    if (scheduledFrame !== 0) {
      return;
    }

    scheduledFrame = window.requestAnimationFrame(() => {
      scheduledFrame = 0;
      applyFilterSafely();
    });
  };

  const attachObserverToActiveTableBody = () => {
    const tbody = getActiveTableBody();
    if (tbody == null) {
      disconnectActiveObserver();
      return;
    }

    if (activeTbodyObserver != null) {
      disconnectActiveObserver();
    }

    activeTbodyObserver = new MutationObserver(() => {
      if (!isApplyingFilter) {
        console.log("activeTbodyObserver triggered");
        scheduleFilterVehicleList();
      }
    });

    activeTbodyObserver.observe(tbody, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  };

  const refreshObserverAndFilter = () => {
    attachObserverToActiveTableBody();
    scheduleFilterVehicleList();
  };

  btn.addEventListener("click", () => {
    const enabled = getVehicleFilterEnabled();

    setVehicleFilterEnabled(!enabled);
    setIcon(statusIcon, !enabled);
    scheduleFilterVehicleList();
  });

  document.getElementById("tabs")?.addEventListener("click", () => {
    console.log("tabs click");
    window.setTimeout(refreshObserverAndFilter, 0);
  });

  refreshObserverAndFilter();
})();
