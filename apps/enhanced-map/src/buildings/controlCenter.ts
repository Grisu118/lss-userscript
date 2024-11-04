import { Marker } from "leaflet";
import { Building } from "./building";

export const drawBuildingsOfControlCenter = (controlCenterId: number, buildings: Building[]): Marker[] => {
  const relevantBuildings = buildings.filter((building) => building.leitstelle_building_id === controlCenterId);

  return relevantBuildings.map((building) =>
    L.circleMarker([building.latitude, building.longitude], {
      radius: 10,
      fillColor: "#ff0000",
      color: "#0000ff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    }),
  );
};
