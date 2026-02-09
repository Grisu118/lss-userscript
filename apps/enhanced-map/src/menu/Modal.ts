import { BuildingType } from "@lss/api";
import { getBuildings, getEquipments, getVehicles } from "@lss/storage";
import dayjs from "dayjs";
import { Marker } from "leaflet";
import { drawBuildingsOfDispatchCenter } from "../buildings/dispatchCenter";
import { VEHICLE_AND_EQUIPMENT_GROUPS } from "../vehicles/VehicleAndEquipmentGroups";
import { drawVehicleLocations } from "../vehicles/vehicleLocations";

export const ID = "LSS_LS42_EHM_MODAL";

const BUILDING_STATE_REFRESH_BTN_ID = "LSS_LS42_EHM_MODAL_BUILDING_STATE_REFRESH_BTN";
const BUILDING_STATE_ID = "LSS_LS42_EHM_MODAL_BUILDING_STATE";
const SELECT_DISPATCH_CENTER_ID = "LSS_LS42_EHM_MODAL_SELECT_DISPATCH_CENTER";
const CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID =
  "LSS_LS42_EHM_MODAL_CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_CENTER";
const VEHICLES_STATE_REFRESH_BTN_ID = "LSS_LS42_EHM_MODAL_VEHICLE_STATE_REFRESH_BTN";
const EQUIPMENTS_STATE_REFRESH_BTN_ID = "LSS_LS42_EHM_MODAL_EQUIPMENT_STATE_REFRESH_BTN";
const VEHICLES_STATE_ID = "LSS_LS42_EHM_MODAL_VEHICLE_STATE";
const EQUIPMENTS_STATE_ID = "LSS_LS42_EHM_MODAL_EQUIPMENT_STATE";
const SELECT_VEHICLE_GROUP = "LSS_LS42_EHM_MODAL_SELECT_VEHICLE_GROUP";
const CHECKBOX_HIGHLIGHT_BUILDINGS_OF_VEHICLE_GROUP =
  "LSS_LS42_EHM_MODAL_CHECKBOX_HIGHLIGHT_BUILDINGS_OF_VEHICLE_GROUP";

const renderBody = (body: HTMLElement): void => {
  body.innerHTML = `
<form class="form-horizontal">
  <div class="form-group">
    <h2>DispatchCenter</h2>
  </div>
  <div class="form-group">
    <label for="${SELECT_DISPATCH_CENTER_ID}" class="col-sm-2 control-label">DispatchCenter</label>
    <div class="col-sm-10">
      <select class="form-control" id="${SELECT_DISPATCH_CENTER_ID}">
      </select>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input id="${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID}" type="checkbox"> Highlight Buildings of Dispatch Center
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <h2>Vehicles</h2>
  </div><div class="form-group">
    <label for="${SELECT_VEHICLE_GROUP}" class="col-sm-2 control-label">VehicleGroup</label>
    <div class="col-sm-10">
      <select class="form-control" id="${SELECT_VEHICLE_GROUP}">
      </select>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input id="${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_VEHICLE_GROUP}" type="checkbox"> Highlight Buildings of Vehicile Group
        </label>
      </div>
    </div>
  </div>
</form>
  `;
};

let dispatchCenterMarkers: Marker[] = [];
let vehicleGroupMarkers: Marker[] = [];

const onHighlightBuildingsOfDispatches = async () => {
  const checkBox = document.querySelector<HTMLInputElement>(`#${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID}`);
  const select = document.querySelector<HTMLSelectElement>(`#${SELECT_DISPATCH_CENTER_ID}`);

  if (checkBox && checkBox.checked && select && !Number.isNaN(Number.parseInt(select.value))) {
    const buildings = await getBuildings();
    dispatchCenterMarkers.forEach((m) => m.remove());
    dispatchCenterMarkers = drawBuildingsOfDispatchCenter(+select.value, Object.values(buildings.data));
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatchCenterMarkers.forEach((m) => m.addTo(map!));
  } else {
    dispatchCenterMarkers.forEach((m) => m.remove());
  }
};

const onHighlightBuildingsOfVehicleGroup = async () => {
  const checkBox = document.querySelector<HTMLInputElement>(`#${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_VEHICLE_GROUP}`);
  const select = document.querySelector<HTMLSelectElement>(`#${SELECT_VEHICLE_GROUP}`);

  if (checkBox && checkBox.checked && select && VEHICLE_AND_EQUIPMENT_GROUPS[select.value] !== undefined) {
    const buildings = await getBuildings();
    const vehicles = await getVehicles();
    const equipments = await getEquipments();
    vehicleGroupMarkers.forEach((m) => m.remove());
    vehicleGroupMarkers = drawVehicleLocations(
      VEHICLE_AND_EQUIPMENT_GROUPS[select.value],
      buildings.data,
      vehicles.data,
      equipments.data,
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    vehicleGroupMarkers.forEach((m) => m.addTo(map!));
  } else {
    vehicleGroupMarkers.forEach((m) => m.remove());
  }
};

const init = (): void => {
  const refreshBuildings = document.getElementById(BUILDING_STATE_REFRESH_BTN_ID);
  if (refreshBuildings) {
    refreshBuildings.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      await getBuildings(true);
      await updateModal();
    });
  }
  const refreshVehicles = document.getElementById(VEHICLES_STATE_REFRESH_BTN_ID);
  if (refreshVehicles) {
    refreshVehicles.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      await getVehicles(true);
      await updateModal();
    });
  }
  const refreshEquipments = document.getElementById(EQUIPMENTS_STATE_REFRESH_BTN_ID);
  if (refreshEquipments) {
    refreshEquipments.addEventListener("click", async (ev) => {
      ev.stopPropagation();
      await getEquipments(true);
      await updateModal();
    });
  }

  document
    .querySelector<HTMLInputElement>(`#${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID}`)
    ?.addEventListener("change", onHighlightBuildingsOfDispatches);
  document
    .querySelector<HTMLSelectElement>(`#${SELECT_DISPATCH_CENTER_ID}`)
    ?.addEventListener("change", onHighlightBuildingsOfDispatches);
  document
    .querySelector<HTMLInputElement>(`#${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_VEHICLE_GROUP}`)
    ?.addEventListener("change", onHighlightBuildingsOfVehicleGroup);
  document
    .querySelector<HTMLSelectElement>(`#${SELECT_VEHICLE_GROUP}`)
    ?.addEventListener("change", onHighlightBuildingsOfVehicleGroup);
};

export const updateModal = async () => {
  const buildings = await getBuildings();
  const vehicles = await getVehicles();
  const equipments = await getEquipments();

  const buildingState = document.getElementById(BUILDING_STATE_ID);
  if (buildingState) {
    buildingState.innerText = dayjs(buildings.metadata.timestamp).format("DD.MM.YYYY HH:mm:ss");
  }
  const vehicleState = document.getElementById(VEHICLES_STATE_ID);
  if (vehicleState) {
    vehicleState.innerText = dayjs(vehicles.metadata.timestamp).format("DD.MM.YYYY HH:mm:ss");
  }
  const equipmentState = document.getElementById(EQUIPMENTS_STATE_ID);
  if (equipmentState) {
    equipmentState.innerText = dayjs(equipments.metadata.timestamp).format("DD.MM.YYYY HH:mm:ss");
  }

  const dispatchSelect = document.getElementById(SELECT_DISPATCH_CENTER_ID);
  if (dispatchSelect) {
    // remove existing options
    // TODO this also resets the selection, would be better if we only append / remove changed items
    dispatchSelect.innerHTML = "";
    const dispatchCenters = Object.values(buildings.data).filter(
      (b) => b.building_type == BuildingType.DISPATCH_CENTER,
    );
    dispatchCenters.forEach((dispatchCenter) => {
      const option = document.createElement("option");
      option.value = dispatchCenter.id.toString();
      option.innerText = dispatchCenter.caption;
      dispatchSelect.appendChild(option);
    });
  }

  const vehicleGroupSelect = document.getElementById(SELECT_VEHICLE_GROUP);
  if (vehicleGroupSelect) {
    // remove existing options
    // TODO this also resets the selection, would be better if we only append / remove changed items
    vehicleGroupSelect.innerHTML = "";
    Object.keys(VEHICLE_AND_EQUIPMENT_GROUPS).forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.innerText = key;
      vehicleGroupSelect.appendChild(option);
    });
  }
};

export const renderModal = () => {
  const modal = document.createElement("div");
  modal.id = ID;
  modal.classList.add("modal");
  modal.classList.add("fade");
  modal.role = "dialog";
  modal.style.display = "none";
  modal.style.zIndex = "5000";

  const dialog = document.createElement("div");
  dialog.classList.add("modal-dialog");
  dialog.classList.add("modal-lg");
  dialog.role = "document";
  // dialog.style.width = "1280px"
  modal.appendChild(dialog);

  const content = document.createElement("div");
  content.classList.add("modal-content");
  dialog.appendChild(content);

  const header = document.createElement("div");
  header.classList.add("modal-header");
  content.appendChild(header);

  const headerText = document.createElement("h1");
  headerText.classList.add("modal-title");
  headerText.innerText = "[EHM] Enhanced Map";
  header.appendChild(headerText);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close");
  closeBtn.setAttribute("data-dismiss", "modal");
  closeBtn.innerHTML = "<span>×</span>";
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.classList.add("modal-body");
  renderBody(body);
  content.appendChild(body);

  const footer = document.createElement("div");
  footer.classList.add("modal-footer");
  content.appendChild(footer);

  const footerRow = document.createElement("div");
  footerRow.classList.add("row");
  footer.appendChild(footerRow);

  const footerLeftCol = document.createElement("div");
  footerLeftCol.classList.add("col-md-8");
  footerRow.appendChild(footerLeftCol);

  const cacheInfo = document.createElement("div");
  cacheInfo.style.display = "flex";
  cacheInfo.style.flexDirection = "row";
  cacheInfo.style.columnGap = "4px";
  cacheInfo.style.alignItems = "center";
  footerLeftCol.appendChild(cacheInfo);

  const refreshBuildingsBtn = document.createElement("button");
  refreshBuildingsBtn.id = BUILDING_STATE_REFRESH_BTN_ID;
  refreshBuildingsBtn.classList.add("btn");
  refreshBuildingsBtn.classList.add("btn-xs");
  refreshBuildingsBtn.classList.add("btn-default");
  refreshBuildingsBtn.title = "Reload Buildings";
  refreshBuildingsBtn.innerHTML = `<span class="glyphicon glyphicon-repeat"></span>`;

  cacheInfo.appendChild(refreshBuildingsBtn);
  const buildingTxt = document.createElement("strong");
  buildingTxt.innerText = "Building State:";
  cacheInfo.appendChild(buildingTxt);
  const buildingTxtDate = document.createElement("span");
  buildingTxtDate.id = BUILDING_STATE_ID;
  buildingTxtDate.innerText = "Date missing";
  cacheInfo.appendChild(buildingTxtDate);

  const refreshVehiclesBtn = document.createElement("button");
  refreshVehiclesBtn.id = VEHICLES_STATE_REFRESH_BTN_ID;
  refreshVehiclesBtn.classList.add("btn");
  refreshVehiclesBtn.classList.add("btn-xs");
  refreshVehiclesBtn.classList.add("btn-default");
  refreshVehiclesBtn.title = "Reload Vehicles";
  refreshVehiclesBtn.innerHTML = `<span class="glyphicon glyphicon-repeat"></span>`;

  cacheInfo.appendChild(refreshVehiclesBtn);
  const vehiclesTxt = document.createElement("strong");
  vehiclesTxt.innerText = "Vehicle State:";
  cacheInfo.appendChild(vehiclesTxt);
  const vehiclesTxtDate = document.createElement("span");
  vehiclesTxtDate.id = VEHICLES_STATE_ID;
  vehiclesTxtDate.innerText = "Date missing";
  cacheInfo.appendChild(vehiclesTxtDate);

  const refreshEquipmentsBtn = document.createElement("button");
  refreshEquipmentsBtn.id = EQUIPMENTS_STATE_REFRESH_BTN_ID;
  refreshEquipmentsBtn.classList.add("btn");
  refreshEquipmentsBtn.classList.add("btn-xs");
  refreshEquipmentsBtn.classList.add("btn-default");
  refreshEquipmentsBtn.title = "Reload Equipments";
  refreshEquipmentsBtn.innerHTML = `<span class="glyphicon glyphicon-repeat"></span>`;

  cacheInfo.appendChild(refreshEquipmentsBtn);
  const equipmentsTxt = document.createElement("strong");
  equipmentsTxt.innerText = "Vehicle State:";
  cacheInfo.appendChild(equipmentsTxt);
  const equipmentsTxtDate = document.createElement("span");
  equipmentsTxtDate.id = EQUIPMENTS_STATE_ID;
  equipmentsTxtDate.innerText = "Date missing";
  cacheInfo.appendChild(equipmentsTxtDate);

  const footerColRight = document.createElement("div");
  footerColRight.classList.add("col-md-4");
  footerRow.appendChild(footerColRight);

  const footerCloseBtn = document.createElement("button");
  footerCloseBtn.classList.add("btn");
  footerCloseBtn.classList.add("btn-secondary");
  footerCloseBtn.setAttribute("data-dismiss", "modal");
  footerCloseBtn.innerText = "Close";
  footerColRight.appendChild(footerCloseBtn);

  document.body.append(modal);

  init();
  updateModal();
};
