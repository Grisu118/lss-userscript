import { Equipment } from "./dto";

export const fetchAllEquipments = async (): Promise<Record<string, Equipment>> => {
  const response = await fetch("/api/equipments");
  const body = await response.json();
  const result = body as Equipment[];
  const resultMap: Record<string, Equipment> = {};
  for (const equipment of result) {
    resultMap[equipment.id] = equipment;
  }
  return resultMap;
};
