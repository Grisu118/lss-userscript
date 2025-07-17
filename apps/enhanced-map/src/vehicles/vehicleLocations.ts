import { BuildingMap, VehicleMap } from "@lss/storage";
import { Marker } from "leaflet";
import { VehicleAndEquipmentGroup } from "./VehicleAndEquipmentGroups";

export const drawVehicleLocations = (
  group: VehicleAndEquipmentGroup,
  buildings: BuildingMap,
  vehicles: VehicleMap,
): Marker[] => {
  const vehiclesToDraw = Object.values(vehicles).filter(
    (vehicle) =>
      group.vehicles.includes(vehicle.vehicle_type) ||
      vehicle.equipments.some((eq) => group.equipment.includes(eq.equipment_type)),
  );

  return vehiclesToDraw.map((vehicle) => {
    const building = buildings[vehicle.building_id];
    return L.circleMarker([building.latitude, building.longitude], {
      radius: 10,
      fillColor: "#ff0000",
      color: "#0000ff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });
  });
};
