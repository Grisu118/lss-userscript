import { EquipmentType } from "./EquipmentType";

export interface Equipment {
  id: number;
  building_id: number;
  vehicle_id?: number;
  assigned_vehicle_id?: number;
  equipment_type: EquipmentType;
  size: number;
  caption: string;
  min_personal: number;
  bound_to_mission?: unknown;
}
