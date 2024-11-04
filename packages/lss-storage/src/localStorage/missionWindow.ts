import { LSS_LOCAL_STORAGE } from "./localStorage";

const VEHICLE_FILTER_KEY = "MVF_FILTER_ENABLED";

export const getVehicleFilterEnabled = (): boolean => {
  return LSS_LOCAL_STORAGE.getAsBoolean(VEHICLE_FILTER_KEY) ?? false;
};

export const setVehicleFilterEnabled = (enabled: boolean): void => {
  LSS_LOCAL_STORAGE.set(VEHICLE_FILTER_KEY, enabled);
};
