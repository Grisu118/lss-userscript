import { Mission } from "@lss/api";

export const fetchAllMissions = async (): Promise<Mission[]> => {
  const response = await fetch("/einsaetze.json");
  const body = await response.json();
  return body as Mission[];
};
