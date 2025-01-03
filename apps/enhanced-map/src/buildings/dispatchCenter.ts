import { Building } from "@lss/api";
import { Marker } from "leaflet";

export const drawBuildingsOfDispatchCenter = (controlCenterId: number, buildings: Building[]): Marker[] => {
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
