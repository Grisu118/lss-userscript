import { Building } from "@lss/api";
import { CachedBuildings } from "@lss/storage";

export const renderBuildingsCounter = (buildings: CachedBuildings, currentBuilding: Building): void => {
  const relevantBuildings = Object.values(buildings.data)
    .filter((building) => building.building_type == currentBuilding.building_type)
    .sort((a, b) => a.id - b.id);

  console.log(`There are ${relevantBuildings.length} buildings of type ${currentBuilding.building_type}`);

  const index = relevantBuildings.findIndex((building) => building.id === currentBuilding.id);
  console.log(`Current building is ${index + 1} of ${relevantBuildings.length}`);

  const breadcrumb = document.querySelector<HTMLOListElement>(".breadcrumb");

  if (breadcrumb) {
    const elem = document.createElement("span");
    elem.innerText = `${index + 1} / ${relevantBuildings.length}`;
    elem.classList.add("building-counter");
    breadcrumb.append(elem);
  }
};
