import { BuildingType, changeTractiveVehicle, changeVehicleType, Vehicle, VehicleType } from "@lss/api";
import { getBuildings, getVehicles } from "@lss/storage";
import { GrisuCustomVehicleTypes } from "./GrisuCustomVehicleTypes";

const THW_TRAILERS: Record<number, VehicleType> = {
  [VehicleType.THW_ANH_7]: VehicleType.THW_LKW7_LBW_FGR_WP,
  [VehicleType.THW_ANH_SWPU]: VehicleType.THW_MLW4,
  [VehicleType.THW_Anh_DLE]: VehicleType.THW_MLW5,
  [VehicleType.THW_BRmG_R]: VehicleType.THW_LKW_K9,
  [VehicleType.THW_ANH_HUND]: VehicleType.THW_MTW_O,
  [VehicleType.THW_NEA50]: VehicleType.THW_MzKW,
  [VehicleType.THW_NEA200]: VehicleType.THW_LKW7_LBW_FGR_E,
  [VehicleType.THW_FUELA_TRAILER]: VehicleType.THW_FUEKOMKW,
  [VehicleType.THW_ANH_PLATFORM_FGR_BRB]: VehicleType.THW_MzGW_FGR_BRB,
};

const applyTractiveVehicle = async (trailer: Vehicle, tractiveVehicle: Vehicle) => {
  if (trailer.tractive_random || trailer.tractive_vehicle_id !== tractiveVehicle.id) {
    console.log(`Applying tractive vehicle ${tractiveVehicle.id} to vehicle ${trailer.id}`);
    await changeTractiveVehicle(trailer.id, tractiveVehicle.id);
  }
};

export const checkTractiveVehicle = async (trailer: Vehicle) => {
  const vehicles = await getVehicles();
  const vehiclesOfBuilding = Object.values(vehicles.data).filter((v) => v.building_id === trailer.building_id);

  const tractiveVehicleType = THW_TRAILERS[trailer.vehicle_type];

  const tractiveCandidates = vehiclesOfBuilding.filter((v) => v.vehicle_type === tractiveVehicleType);

  if (tractiveCandidates.length > 1) {
    // Multi-pair case: find all trailers of this type in the building and pair by sorted ID
    const trailersOfSameType = vehiclesOfBuilding
      .filter((v) => v.vehicle_type === trailer.vehicle_type)
      .sort((a, b) => a.id - b.id);
    const sortedCandidates = [...tractiveCandidates].sort((a, b) => a.id - b.id);

    if (trailersOfSameType.length !== sortedCandidates.length) {
      console.error(
        `Mismatch: ${trailersOfSameType.length} trailers of type ${trailer.vehicle_type_caption} but ${sortedCandidates.length} tractive vehicles in building ${trailer.building_id}`,
      );
      return;
    }

    console.debug(
      `Multiple pairs found in building ${trailer.building_id}: pairing ${trailersOfSameType.map((v) => v.id).join(", ")} with ${sortedCandidates.map((v) => v.id).join(", ")}`,
    );

    // Only process the pair for this specific trailer to avoid duplicate API calls
    const trailerIndex = trailersOfSameType.findIndex((v) => v.id === trailer.id);
    await applyTractiveVehicle(trailer, sortedCandidates[trailerIndex]);
  } else if (tractiveCandidates.length === 1) {
    await applyTractiveVehicle(trailer, tractiveCandidates[0]);
  } else {
    console.error(`No tractive vehicle found for vehicle ${trailer.id} of type ${trailer.vehicle_type_caption}`);
  }
};

export const applyTHWCustomTypesAndTrailers = async (force: boolean = false) => {
  const vehicles = await getVehicles(force);
  // refresh building cache if required
  await getBuildings(force);

  for (const vehicle of Object.values(vehicles.data)) {
    if (
      vehicle.vehicle_type === VehicleType.THW_ANH_SWPU &&
      vehicle.vehicle_type_caption !== GrisuCustomVehicleTypes.THW_SwPu
    ) {
      console.log(`Changing ${vehicle.id} from ${vehicle.vehicle_type_caption} to ${GrisuCustomVehicleTypes.THW_SwPu}`);
      await changeVehicleType(vehicle.id, GrisuCustomVehicleTypes.THW_SwPu, true);
    } else if (
      vehicle.vehicle_type === VehicleType.THW_ANH_7 &&
      vehicle.vehicle_type_caption !== GrisuCustomVehicleTypes.THW_Anh7
    ) {
      console.log(`Changing ${vehicle.id} from ${vehicle.vehicle_type_caption} to ${GrisuCustomVehicleTypes.THW_Anh7}`);
      await changeVehicleType(vehicle.id, GrisuCustomVehicleTypes.THW_Anh7, true);
    }

    if (vehicle.vehicle_type in THW_TRAILERS) {
      await checkTractiveVehicle(vehicle);
    }
  }
  console.log("Done");
};

export const applySEGRTWCustomType = async (force: boolean = false) => {
  const vehicles = await getVehicles(force);
  const buildings = await getBuildings(force);

  for (const vehicle of Object.values(vehicles.data)) {
    if (
      vehicle.vehicle_type === VehicleType.MD_RTW &&
      vehicle.vehicle_type_caption !== GrisuCustomVehicleTypes.SEGRTW
    ) {
      // check if this rtw is part of a seg building
      const building = buildings.data[vehicle.building_id];
      if (building && building.building_type === BuildingType.MEDIC_SEG) {
        console.log(`Changing ${vehicle.id} from ${vehicle.vehicle_type_caption} to ${GrisuCustomVehicleTypes.SEGRTW}`);
        await changeVehicleType(vehicle.id, GrisuCustomVehicleTypes.SEGRTW, true);
      }
    }
  }
  console.log("Done");
};
