import { blockHospitals } from "./hospital";

(() => {
  const transportRequestElem = document.querySelector<HTMLDivElement>(
    '[data-transport-request="true"]',
  );
  if (transportRequestElem) {
    // we have an open transport request
    if (
      transportRequestElem.getAttribute("data-transport-request-type") ===
      "patient"
    ) {
      blockHospitals(transportRequestElem);
    }

    // TODO handle police transports
  }
})();
