import { EquipmentType } from "./EquipmentType";

export interface Vehicle {
  id: number;
  caption: string;
  building_id: number;
  vehicle_type: number;
  fms_real: number;
  fms_show: number;
  vehicle_type_caption?: string;
  working_hour_start?: number;
  working_hour_end?: number;
  alarm_delay: number;
  max_personnel_override?: number;
  ignore_aao: boolean;
  tractive_vehicle_id?: number;
  assigned_personnel_count?: number;
  target_type?: string;
  target_id?: number;
  queued_mission_id?: string;
  image_url_static: string;
  image_url_animated: string;
  equipments: Equipment[];
  tractive_random: boolean;
}

export interface Equipment {
  caption: string;
  size: number;
  equipment_type: EquipmentType;
}
