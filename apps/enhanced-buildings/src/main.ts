import "./style.css";
import { Building } from "@lss/api";

import { CachedBuildings, getBuildings } from "@lss/storage";

const loadBuildings = async (buildingId: number, retry?: boolean): Promise<[CachedBuildings, Building]> => {
  const buildings = await getBuildings(retry);
  const currentBuilding = buildings.data[buildingId];
  if (!currentBuilding) {
    if (retry) {
      throw new Error("Could not load building");
    }
    return loadBuildings(buildingId, true);
  } else {
    return [buildings, currentBuilding];
  }
};

(async () => {
  const buildingId = +location.pathname.split("/")[2];

  const [buildings, currentBuilding] = await loadBuildings(buildingId);

  const relevantBuildings = Object.values(buildings.data)
    .filter((building) => building.building_type == currentBuilding.building_type)
    .sort((a, b) => a.id - b.id);

  console.log(`There are ${relevantBuildings.length} buildings of type ${currentBuilding.building_type}`);

  const index = relevantBuildings.findIndex((building) => building.id == buildingId);
  console.log(`Current building is ${index + 1} of ${relevantBuildings.length}`);

  const breadcrumb = document.querySelector<HTMLOListElement>(".breadcrumb");

  if (breadcrumb) {
    const elem = document.createElement("span");
    elem.innerText = `${index + 1} / ${relevantBuildings.length}`;
    elem.classList.add("building-counter");
    breadcrumb.append(elem);
  }
})();
