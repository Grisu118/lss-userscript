import { BuildingType } from "@lss/api";
import { getBuildings } from "@lss/storage";
import dayjs from "dayjs";
import { Marker } from "leaflet";
import { drawBuildingsOfDispatchCenter } from "../buildings/dispatchCenter";

export const ID = "LSS_LS42_EHM_MODAL";

const BUILDING_STATE_REFRESH_BTN_ID = "LSS_LS42_EHM_MODAL_BUILDING_STATE_REFRESH_BTN";
const BUILDING_STATE_ID = "LSS_LS42_EHM_MODAL_BUILDING_STATE";
const SELECT_DISPATCH_CENTER_ID = "LSS_LS42_EHM_MODAL_SELECT_DISPATCH_CENTER";
const CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID =
  "LSS_LS42_EHM_MODAL_CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_CENTER";

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
</form>
  `;
};

let dispatchCenterMarkers: Marker[] = [];

const onHighlightBuildingsOfDispatches = async () => {
  const checkBox = document.querySelector<HTMLInputElement>(`#${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID}`);
  const select = document.querySelector<HTMLSelectElement>(`#${SELECT_DISPATCH_CENTER_ID}`);

  if (checkBox && checkBox.checked && select && !Number.isNaN(Number.parseInt(select.value))) {
    const buildings = await getBuildings();
    dispatchCenterMarkers.forEach((m) => m.remove());
    dispatchCenterMarkers = drawBuildingsOfDispatchCenter(+select.value, buildings.data);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dispatchCenterMarkers.forEach((m) => m.addTo(map!));
  } else {
    dispatchCenterMarkers.forEach((m) => m.remove());
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

  const checkBox = document.querySelector<HTMLInputElement>(`#${CHECKBOX_HIGHLIGHT_BUILDINGS_OF_DISPATCH_ID}`);
  const select = document.querySelector<HTMLSelectElement>(`#${SELECT_DISPATCH_CENTER_ID}`);
  checkBox?.addEventListener("change", onHighlightBuildingsOfDispatches);
  select?.addEventListener("change", onHighlightBuildingsOfDispatches);
};

export const updateModal = async () => {
  const buildings = await getBuildings();

  const buildingState = document.getElementById(BUILDING_STATE_ID);
  if (buildingState) {
    buildingState.innerText = dayjs(buildings.timestamp).format("DD.MM.YYYY HH:mm:ss");
  }

  const dispatchSelect = document.getElementById(SELECT_DISPATCH_CENTER_ID);
  if (dispatchSelect) {
    // remove existing options
    // TODO this also resets the selection, would be better if we only append / remove changed items
    dispatchSelect.innerHTML = "";
    const dispatchCenters = buildings.data.filter((b) => b.building_type == BuildingType.DISPATCH_CENTER);
    dispatchCenters.forEach((dispatchCenter) => {
      const option = document.createElement("option");
      option.value = dispatchCenter.id.toString();
      option.innerText = dispatchCenter.caption;
      dispatchSelect.appendChild(option);
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
