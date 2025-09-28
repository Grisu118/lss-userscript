import { BuildingType, VehicleType } from "@lss/api";

/**
 * The following placeholders will be replaced with the values from nameRegex
 * {ORG} ->
 * {ORG_CAP} -> same as org but with .toUpperCase called before
 * {B_NB} -> The building number
 * {V_NB} -> The vehicle number
 * {V_TYPE} -> the mapped vehicle type
 */
export type VehicleNameTemplate = string;

export type VehicleTypeMapping = Partial<Record<VehicleType, string>>;

export interface Range {
  start: number;
  end: number;
}

export interface CustomVehicleType {
  originalType: VehicleType;
  customType: string;
}

export type ExtendedVehicleType = VehicleType | CustomVehicleType;

export interface VehicleNamingSchema {
  /**
   * where the numbering should begin and end (both inclusive)
   *
   * will be used in V_NB variable
   */
  numberRange: Range;
  /**
   * the vehicle types to include in this numbering.
   * If an array, the first vehicle type in the array will get the first numbers
   */
  vehicleTypes: ExtendedVehicleType[] | ExtendedVehicleType;
}

export interface Schema {
  buildingType: BuildingType;
  /**
   * The following named groups are expected
   * org -> organization
   * nb -> building number
   */
  nameRegex: RegExp;
  /**
   * Mapping of numbers to vehicle types
   */
  vehicleNamings: VehicleNamingSchema[];
  /**
   * The global vehicle name template
   */
  nameTemplate: VehicleNameTemplate;
  /**
   * Optional mapping of vehicle types to custom types. Overrides the global vehicleTypeMappings
   */
  vehicleTypeMappings?: VehicleTypeMapping;
}
