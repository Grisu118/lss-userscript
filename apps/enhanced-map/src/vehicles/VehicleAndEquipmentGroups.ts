import { EquipmentType, VehicleType } from "@lss/api";

export type VehicleAndEquipmentGroup = { vehicles: number[]; equipment: string[] };

export const VEHICLE_AND_EQUIPMENT_GROUPS: { [index: string]: VehicleAndEquipmentGroup } = {
  BREATHING_PROTECTION: {
    vehicles: [VehicleType.FD_GWA, VehicleType.FD_AB_BREATHING_PROTECTION],
    equipment: [EquipmentType.BREATHING_PROTECTION],
  },
  DECON: {
    vehicles: [VehicleType.FD_DEKON_P, VehicleType.FD_AB_DEKON_P],
    equipment: [EquipmentType.DECON],
  },
  DIVER: {
    vehicles: [VehicleType.GW_DIVER],
    equipment: [EquipmentType.DIVER],
  },
  HAZMAT: {
    vehicles: [VehicleType.FD_GWG, VehicleType.FD_AB_HAZMAT],
    equipment: [EquipmentType.HAZMAT],
  },
  HEAVY_RESQUE: {
    vehicles: [VehicleType.FD_HLF_20, VehicleType.FD_HLF_10, VehicleType.FD_RW, VehicleType.FD_AB_HEAVY_RESCUE],
    equipment: [EquipmentType.HEAVY_RESCUE],
  },
  HIGHT_RESCUE: {
    vehicles: [VehicleType.FD_GWH],
    equipment: [EquipmentType.HIGHT_RESCUE],
  },
  HOSE_WATER: {
    vehicles: [
      VehicleType.FD_SW_1000,
      VehicleType.FD_SW_2000,
      VehicleType.FD_SW_2000TR,
      VehicleType.FD_SW_KATS,
      VehicleType.FD_GW_L2_W,
      VehicleType.FD_AB_HOSE_WATER,
      VehicleType.FD_HOSE_TRAILER,
    ],
    equipment: [EquipmentType.HOSE_WATER],
  },
  OIL: {
    vehicles: [VehicleType.FD_GW_OIL, VehicleType.FD_AB_OIL],
    equipment: [EquipmentType.OIL],
  },
};
