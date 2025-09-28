import "./style.css";
import { Building } from "@lss/api";

import { CachedBuildings, getBuildings } from "@lss/storage";
import { autonaming } from "./autonaming/autonaming";
import { renderBuildingsCounter } from "./counter/counter";

const loadBuildings = async (
  buildingId: number,
  buildingName?: string,
  retry?: boolean,
): Promise<[CachedBuildings, Building]> => {
  const buildings = await getBuildings(retry);
  const currentBuilding = buildings.data[buildingId];
  if (!currentBuilding || (buildingName && currentBuilding.caption !== buildingName)) {
    if (retry) {
      throw new Error("Could not load building");
    }
    return loadBuildings(buildingId, undefined, true);
  } else {
    return [buildings, currentBuilding];
  }
};

(async () => {
  const buildingId = +location.pathname.split("/")[2];
  const buildingName = document.querySelector(".building-title > h1")?.textContent?.trim();

  const [buildings, currentBuilding] = await loadBuildings(buildingId, buildingName);

  // render x / y buildings in upper right corner
  renderBuildingsCounter(buildings, currentBuilding);

  autonaming(currentBuilding);
})();
