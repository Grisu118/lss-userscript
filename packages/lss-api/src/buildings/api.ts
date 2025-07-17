import { Building } from "@lss/api";

export const fetchAllBuildings = async (): Promise<Record<string, Building>> => {
  const response = await fetch("/api/buildings");
  const body = (await response.json()) as Building[];
  const result: Record<string, Building> = {};
  for (const building of body) {
    result[building.id] = building;
  }
  return result;
};
