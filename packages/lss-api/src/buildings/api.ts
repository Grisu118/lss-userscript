import { Building } from "@lss/api";

export const fetchAllBuildings = async (): Promise<Building[]> => {
  const response = await fetch("/api/buildings");
  const body = await response.json();
  return body as Building[];
};
