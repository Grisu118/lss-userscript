import { VehicleType } from "@lss/api";

const ALLOWED_VEHICLE_TYPES = [VehicleType.MTW_OV, VehicleType.BT_LKW];
const ALLOWED_CUSTOM_VEHICLE_TYPES = ["FR"];

interface SparseVehicle {
  id: number;
  name: string;
  type: string;
}

function extractSparseVehicle(row: HTMLTableRowElement, checkbox: HTMLInputElement): SparseVehicle {
  const idString = checkbox.getAttribute("value");
  const name = row.getAttribute("vehicle_caption");
  const type = row.getAttribute("vehicle_type");

  if (idString == null || name == null || type == null) {
    throw new Error("Missing data");
  }

  return {
    id: +idString,
    name,
    type,
  };
}

function findNextFirstResponder(): SparseVehicle | undefined {
  const rows = document.querySelectorAll<HTMLTableRowElement>("#vehicle_show_table_body_all > tr");

  for (const row of rows) {
    const vehicleTypeAttr = row.getAttribute("vehicle_type");
    const checkBox = row.querySelector<HTMLInputElement>(".vehicle_checkbox");
    if (checkBox == null) {
      continue;
    }
    if (vehicleTypeAttr != null && ALLOWED_CUSTOM_VEHICLE_TYPES.includes(vehicleTypeAttr)) {
      // we found a custom vehicle
      return extractSparseVehicle(row, checkBox);
    }
    const vehicleTypeIdString = checkBox?.getAttribute("vehicle_type_id");

    if (vehicleTypeIdString && ALLOWED_VEHICLE_TYPES.includes(+vehicleTypeIdString)) {
      // we found a vehicle
      return extractSparseVehicle(row, checkBox);
    }
  }
  return undefined;
}

function triggerFirstResponder(vehicle: SparseVehicle) {
  const checkbox = document.querySelector<HTMLInputElement>(`#vehicle_checkbox_${vehicle.id}`);
  if (checkbox == null) {
    console.error("Could not find checkbox for vehicle", vehicle);
    return;
  }
  checkbox.click();
  const row = checkbox.parentElement?.parentElement;
  if (row) {
    row.style.display = "";
  }
}

(() => {
  const navbar = document.querySelector<HTMLDivElement>("#container_navbar_alarm .navbar-header");
  const navbarSpacer = document.querySelector<HTMLDivElement>("#container_navbar_alarm #navbar-alarm-spacer");

  const btnDiv = document.createElement("div");
  btnDiv.className = "flex-row flex-nowrap";
  const btn = document.createElement("button");
  btn.className = "btn btn-sm btn-primary";
  btnDiv.appendChild(btn);
  btn.innerText = "First Responder";
  navbar?.insertBefore(btnDiv, navbarSpacer);

  const frVehicle = findNextFirstResponder();

  if (frVehicle) {
    btn.innerText = `FR: ${frVehicle.name}`;
    btn.onclick = () => {
      triggerFirstResponder(frVehicle);
    };
  }

  document.addEventListener("keydown", (ev) => {
    const target = ev.target as HTMLElement;
    // description is a div with role textbox
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
      // we are typing text, so do nothing
      return;
    }

    switch (ev.key) {
      case "f":
        if (frVehicle) {
          triggerFirstResponder(frVehicle);
        }
        break;
      case "n":
      // TODO retrigger
    }
  });
})();
