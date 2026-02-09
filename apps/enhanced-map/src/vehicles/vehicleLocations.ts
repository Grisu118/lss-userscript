import { BuildingMap, EquipmentMap, VehicleMap } from "@lss/storage";
import { Marker } from "leaflet";
import { VehicleAndEquipmentGroup } from "./VehicleAndEquipmentGroups";

export const drawVehicleLocations = (
  group: VehicleAndEquipmentGroup,
  buildings: BuildingMap,
  vehicles: VehicleMap,
  equipments: EquipmentMap,
): Marker[] => {
  const vehiclesToDraw = Object.values(vehicles).filter((vehicle) => group.vehicles.includes(vehicle.vehicle_type));

  const equipmentsToDraw = Object.values(equipments).filter(
    // only consider equipments with fixed assignments
    (equipment) => equipment.assigned_vehicle_id != null && group.equipment.includes(equipment.equipment_type),
  );

  // don't draw buildings twice'
  const buildingsToDraw = new Set([
    ...vehiclesToDraw.map((vehicle) => buildings[vehicle.building_id]),
    ...equipmentsToDraw.map((equipment) => buildings[equipment.building_id]),
  ]);

  return [...buildingsToDraw].map((building) => {
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
