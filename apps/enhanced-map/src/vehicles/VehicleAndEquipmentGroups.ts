import { EquipmentType, VehicleType } from "@lss/api";

export type VehicleAndEquipmentGroup = { vehicles: number[]; equipment: string[] };

export const VEHICLE_AND_EQUIPMENT_GROUPS: { [index: string]: VehicleAndEquipmentGroup } = {
  BREATHING_PROTECTION: {
    vehicles: [VehicleType.GWA, VehicleType.AB_BREATHING_PROTECTION],
    equipment: [EquipmentType.BREATHING_PROTECTION],
  },
  DECON: {
    vehicles: [VehicleType.DEKON_P, VehicleType.AB_DEKON_P],
    equipment: [EquipmentType.DECON],
  },
  DIVER: {
    vehicles: [VehicleType.GW_TAUCHER],
    equipment: [EquipmentType.DIVER],
  },
  HAZMAT: {
    vehicles: [VehicleType.GWG, VehicleType.AB_HAZMAT],
    equipment: [EquipmentType.HAZMAT],
  },
  HEAVY_RESQUE: {
    vehicles: [VehicleType.HLF_20, VehicleType.HLF_10, VehicleType.RW, VehicleType.AB_HEAVY_RESCUE],
    equipment: [EquipmentType.HEAVY_RESCUE],
  },
  HIGHT_RESCUE: {
    vehicles: [VehicleType.GWH],
    equipment: [EquipmentType.HIGHT_RESCUE],
  },
  HOSE_WATER: {
    vehicles: [
      VehicleType.SW_1000,
      VehicleType.SW_2000,
      VehicleType.SW_2000TR,
      VehicleType.SW_KATS,
      VehicleType.GW_L2_W,
      VehicleType.AB_HOSE_WATER,
      VehicleType.ANH_HOSE_WATER,
    ],
    equipment: [EquipmentType.HOSE_WATER],
  },
  OIL: {
    vehicles: [VehicleType.GW_OIL, VehicleType.AB_OIL],
    equipment: [EquipmentType.OIL],
  },
};
