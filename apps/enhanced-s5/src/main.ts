import { blockHospitals } from "./hospital";

(() => {
  if (location.pathname.includes("/patient/") || location.pathname.includes("/gefangener/")) {
    const nextFMSBtn = document.getElementById("next-vehicle-fms-5");
    const backToMissionBtn = document.getElementById("btn_back_to_mission");

    if (nextFMSBtn) {
      // go to next fms event
      nextFMSBtn.click();
    } else if (backToMissionBtn) {
      // go back to the mission
      backToMissionBtn.click();
    } else {
      // close the popup
      if (window.tellParent) {
        // tell parent seems to be not always available
        window.tellParent("lightboxClose();");
      } else {
        window.parent?.lightboxClose();
      }
    }
  } else {
    const transportRequestElem = document.querySelector<HTMLDivElement>('[data-transport-request="true"]');
    if (transportRequestElem) {
      // we have an open transport request
      if (transportRequestElem.getAttribute("data-transport-request-type") === "patient") {
        blockHospitals(transportRequestElem);
      }

      // TODO handle police transports

      return;
    }
  }
})();
