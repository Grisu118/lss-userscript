import { Mission } from "@lss/api";

export const fetchAllMissions = async (): Promise<Record<string, Mission>> => {
  const response = await fetch("/einsaetze.json");
  const body = (await response.json()) as Mission[];
  const result: Record<string, Mission> = {};
  for (const mission of body) {
    result[mission.id] = mission;
  }
  return result;
};
