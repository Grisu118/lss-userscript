const MINIMAL_REMAINING_PERSONNEL_IN_POLICE_STATION = 34;

interface PersonnelSetting {
  caption: string;
  key: string | null;
  numberOfRequiredPersonnel: number;
  numberOfSelectedPersonnel: number;
}

// https://api.lss-manager.de/de_DE/schoolings
const personnelSettingsInternal: PersonnelSetting[] = [
  {
    caption: "Ohne Ausbildung",
    key: null,
    numberOfRequiredPersonnel: 83,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "Hundeführer (Schutzhund)",
    key: "k9",
    numberOfRequiredPersonnel: 6,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "Hundertschaftsführer (FüKw)",
    key: "police_fukw",
    numberOfRequiredPersonnel: 15,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "MEK",
    key: "police_mek",
    numberOfRequiredPersonnel: 42,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "SEK",
    key: "police_sek",
    numberOfRequiredPersonnel: 42,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "Reiterstaffel",
    key: "police_horse",
    numberOfRequiredPersonnel: 24,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "Wasserwerfer",
    key: "police_wasserwerfer",
    numberOfRequiredPersonnel: 15,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "Zugführer (leBefKw)",
    key: "police_einsatzleiter",
    numberOfRequiredPersonnel: 12,
    numberOfSelectedPersonnel: 0,
  },
  {
    caption: "Lautsprecheroperator",
    key: "police_speaker_operator",
    numberOfRequiredPersonnel: 5,
    numberOfSelectedPersonnel: 0,
  },
];

const personnelSettingsProxy = personnelSettingsInternal.map((setting) => {
  return new Proxy(setting, {
    set: function (target, key: string | symbol, value: unknown) {
      (target as unknown as Record<string, unknown>)[key as string] = value;
      updateFooter(target.key, target.numberOfSelectedPersonnel);
      return true;
    },
  });
});

const loadedBuildings: string[] = [];

interface PersonnelCount {
  total: number;
  bySchooling: Map<string | null, number>;
}

async function loadCurrentBuildingPersonnel(): Promise<void> {
  const buildingIdInput = document.getElementById("building_id") as HTMLInputElement;
  if (!buildingIdInput || !buildingIdInput.value) {
    console.warn("Building ID not found");
    return;
  }

  const buildingId = buildingIdInput.value;
  const url = `/buildings/${buildingId}/schooling_personal_select`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Failed to load building personnel data");
      return;
    }

    const html = await response.text();
    const personnelCount = parsePersonnelFromHTML(html);

    // Update the required personnel based on current building state
    updateRequiredPersonnelFromCurrentState(personnelCount);
  } catch (error) {
    console.error("Error loading building personnel:", error);
  }
}

function parsePersonnelFromHTML(html: string): PersonnelCount {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const bySchooling = new Map<string | null, number>();
  let total = 0;

  // Find all personnel checkboxes
  const checkboxes = doc.querySelectorAll<HTMLInputElement>(".schooling_checkbox");

  checkboxes.forEach((checkbox) => {
    total++;

    // Check which schooling this personnel has
    let schoolingKey: string | null = null;

    for (let i = 0; i < checkbox.attributes.length; i++) {
      const attr = checkbox.attributes[i];
      if (attr.value === "true" && attr.name !== "schooling_checkbox") {
        schoolingKey = attr.name;
        break;
      }
    }

    // If no schooling found, check if it's personnel without schooling
    if (schoolingKey === null) {
      // Find the corresponding schooling cell
      const row = checkbox.closest("tr");
      if (row) {
        const schoolingCell = row.querySelector<HTMLTableCellElement>("td[id^='school_personal_education_']");
        if (schoolingCell && schoolingCell.innerHTML.replace(/\s/g, "").length === 0) {
          schoolingKey = null; // Personnel without schooling
        }
      }
    }

    // Count this personnel
    const currentCount = bySchooling.get(schoolingKey) || 0;
    bySchooling.set(schoolingKey, currentCount + 1);
  });

  return { total, bySchooling };
}

function updateRequiredPersonnelFromCurrentState(personnelCount: PersonnelCount): void {
  personnelSettingsProxy.forEach((setting) => {
    const currentCount = personnelCount.bySchooling.get(setting.key) || 0;

    setting.numberOfSelectedPersonnel = currentCount;
  });
}

function initPanelBodies(): void {
  const elements = document.getElementsByClassName("panel-body");
  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.add("hidden");
  }
}

function removePanelHeadingClickEvent(): void {
  const elements = document.getElementsByClassName("personal-select-heading");
  for (let i = 0; i < elements.length; i++) {
    const clone = elements[i].cloneNode(true) as HTMLElement;
    elements[i].replaceWith(clone);
    clone.addEventListener("click", panelHeadingClickEvent);
  }
}

function addFooter(): void {
  const wrapper = document.createElement("div");
  wrapper.style.cssText = "display: flex; flex-wrap: wrap; flex-direction: row; column-gap: 15px";

  const list = document.createElement("ul");
  list.classList.add("list-inline");
  list.style.cssText = "color: #fff;padding-top: 8px;";

  for (let i = 0; i < personnelSettingsProxy.length; i++) {
    const setting = personnelSettingsProxy[i];
    list.appendChild(createTotalSummaryElement(setting));
  }

  wrapper.appendChild(list);

  const nav = document.querySelector(".navbar.navbar-default.navbar-fixed-bottom");
  nav?.children[0].children[0].insertAdjacentElement("afterend", wrapper);
}

function updateFooter(key: string | null, selectedPersonnel: number): void {
  const element = document.getElementById("number-of-selected-personnel-" + key);
  if (!element) return;

  element.innerHTML = selectedPersonnel.toString();

  const setting = personnelSettingsProxy.find((setting) => setting.key === key);
  if (!setting) return;

  const requiredPersonnel = setting.numberOfRequiredPersonnel;
  const labelClass = selectedPersonnel === requiredPersonnel ? "label-success" : "label-warning";

  const spanPersonnel = document.getElementById("personnel-" + key);
  if (!spanPersonnel) return;

  spanPersonnel.classList.remove("label-success", "label-warning");
  spanPersonnel.classList.add(labelClass);
}

function addClickEventHandlerToCheckboxes(): void {
  const inputElements = document.getElementsByClassName("schooling_checkbox");

  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("change", updateNumberOfSelectedPersonnel);
  }
}

function updateNumberOfSelectedPersonnel(event: Event): void {
  const target = event.target as HTMLInputElement;
  const attributes = target.attributes;

  let key: string | null = null;
  for (let i = 0; i < attributes.length; i++) {
    const attr = attributes[i];
    if (attr.value === "true" && attr.name !== "schooling_checkbox") {
      key = attr.name;
      break;
    }
  }

  const setting = personnelSettingsProxy.find((setting) => setting.key === key);
  if (!setting) return;

  if (target.checked) {
    setting.numberOfSelectedPersonnel = setting.numberOfSelectedPersonnel + 1;
  } else {
    setting.numberOfSelectedPersonnel = setting.numberOfSelectedPersonnel - 1;
  }
}

function addPersonnelSelector(): void {
  const elements = document.getElementsByClassName("panel-heading personal-select-heading");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement;
    const buildingId = element.getAttribute("building_id");
    if (buildingId && element.children[1]) {
      element.children[1].prepend(createPersonnelSelector(buildingId));
    }
  }
}

function createPersonnelSelector(buildingId: string): HTMLElement {
  const trashIcon = document.createElement("span");
  trashIcon.classList.add("glyphicon", "glyphicon-trash");

  const resetButton = document.createElement("button");
  resetButton.classList.add("btn", "btn-xs", "btn-default", "personnel-reset-button");
  resetButton.setAttribute("type", "button");
  resetButton.setAttribute("data-building-id", buildingId);
  resetButton.addEventListener("click", resetPersonnelClick);
  resetButton.appendChild(trashIcon);

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("btn-group", "btn-group-xs");
  buttonGroup.setAttribute("role", "group");
  buttonGroup.appendChild(resetButton);

  // Add individual select buttons for each schooling type
  personnelSettingsProxy.forEach((setting) => {
    buttonGroup.appendChild(createSelectButton(buildingId, setting));
  });

  return buttonGroup;
}

function createSelectButton(buildingId: string, setting: PersonnelSetting): HTMLElement {
  const userIcon = document.createElement("span");
  userIcon.classList.add("glyphicon", "glyphicon-user");

  const button = document.createElement("button");
  button.classList.add("btn", "btn-xs", "btn-default", "personnel-select-button");
  button.setAttribute("id", `personnel-select-button-${buildingId}-${setting.key}`);
  button.setAttribute("type", "button");
  button.setAttribute("data-building-id", buildingId);
  button.setAttribute("data-schooling-key", setting.key || "none");
  button.addEventListener("click", selectPersonnelClick);
  button.title = setting.caption;
  button.innerText = ` ${getShortCaption(setting.caption)}`;
  button.prepend(userIcon);

  // Initially hide all buttons - they will be shown after checking available personnel
  button.style.display = "none";

  return button;
}

function getShortCaption(caption: string): string {
  const shortCaptions: Record<string, string> = {
    "Ohne Ausbildung": "Ohne",
    "Hundeführer (Schutzhund)": "K9",
    "Hundertschaftsführer (FüKw)": "FüKw",
    MEK: "MEK",
    SEK: "SEK",
    Reiterstaffel: "Pferd",
    Wasserwerfer: "WaWe",
    "Zugführer (leBefKw)": "Zug",
    Lautsprecheroperator: "Lautspr.",
  };
  return shortCaptions[caption] || caption;
}

function createTotalSummaryElement(setting: PersonnelSetting): HTMLElement {
  const listItem = document.createElement("li");

  const spanCaption = document.createElement("span");
  spanCaption.innerHTML = setting.caption + ": ";

  const spanSelected = document.createElement("span");
  spanSelected.setAttribute("id", "number-of-selected-personnel-" + setting.key);
  spanSelected.innerHTML = "0";

  const spanRequired = document.createElement("span");
  spanRequired.setAttribute("id", "number-of-required-personnel-" + setting.key);
  spanRequired.innerHTML = setting.numberOfRequiredPersonnel.toString();

  const spanPersonnel = document.createElement("span");
  spanPersonnel.setAttribute("id", "personnel-" + setting.key);
  spanPersonnel.classList.add("label", "label-warning");
  spanPersonnel.appendChild(spanSelected);
  spanPersonnel.appendChild(document.createTextNode("/"));
  spanPersonnel.appendChild(spanRequired);

  listItem.appendChild(spanCaption);
  listItem.appendChild(spanPersonnel);

  return listItem;
}

async function selectPersonnelClick(event: Event): Promise<void> {
  event.preventDefault();

  const button = (event.target as HTMLElement).closest("button") as HTMLButtonElement;
  if (!button) return;

  button.disabled = true;
  button.classList.remove("btn-default");
  button.classList.add("btn-success");

  const okIcon = document.createElement("span");
  okIcon.classList.add("glyphicon", "glyphicon-ok");
  if (button.children[0]) {
    button.replaceChild(okIcon, button.children[0]);
  }

  const buildingId = button.dataset.buildingId;
  const schoolingKey = button.dataset.schoolingKey;

  if (!buildingId || !schoolingKey) return;

  await selectPersonnel(buildingId, schoolingKey === "none" ? null : schoolingKey);

  const panelBody = getPanelBody(buildingId);
  if (!panelBody) return;

  const numberOfSelectedPersonnel = panelBody.querySelectorAll("input:checked").length;
  button.innerHTML = button.innerHTML + ` (${numberOfSelectedPersonnel})`;
}

async function resetPersonnelClick(event: Event): Promise<void> {
  event.preventDefault();

  const resetButton = (event.target as HTMLElement).closest("button") as HTMLButtonElement;
  if (!resetButton) return;

  const buildingId = resetButton.dataset.buildingId;
  if (!buildingId) return;

  // Reset all buttons for this building
  personnelSettingsProxy.forEach((setting) => {
    const selectButton = createSelectButton(buildingId, setting);
    const oldButton = document.getElementById(`personnel-select-button-${buildingId}-${setting.key}`);
    if (oldButton) {
      oldButton.replaceWith(selectButton);
    }
  });

  resetPersonnel(buildingId);

  // Re-check available personnel and show/hide buttons
  await updateButtonVisibility(buildingId);
}

async function selectPersonnel(buildingId: string, targetSchoolingKey: string | null): Promise<void> {
  await panelHeadingClick(buildingId);

  const setting = personnelSettingsProxy.find((s) => s.key === targetSchoolingKey);
  if (!setting) return;

  const panelBody = getPanelBody(buildingId);
  if (!panelBody) return;

  let inputElements: HTMLInputElement[] = [];

  if (setting.key === null) {
    const schoolingCells = panelBody.querySelectorAll<HTMLTableCellElement>("td[id^='school_personal_education_']");
    for (let j = 0; j < schoolingCells.length; j++) {
      const schoolingCell = schoolingCells[j];
      // Personnel with anything but whitespace in schooling column, have a schooling and should not be selected
      if (schoolingCell.innerHTML.replace(/\s/g, "").length > 0) {
        continue;
      }

      const checkbox = schoolingCell.parentElement?.children[0]?.children[0] as HTMLInputElement;
      if (checkbox) {
        inputElements.push(checkbox);
      }
    }
  } else {
    inputElements = Array.from(panelBody.querySelectorAll<HTMLInputElement>(`input[${setting.key}='true']`));
  }

  inputElements = inputElements.filter(function (element) {
    if (typeof element === "undefined") {
      return false;
    }

    const row = element.parentElement?.parentElement;
    if (!row) return false;

    // Check if personnel is not currently assigned (column 3)
    return row.children[3]?.innerHTML.replace(/\s/g, "").length === 0;
  });

  let j = inputElements.length - 1;
  while (setting.numberOfSelectedPersonnel < setting.numberOfRequiredPersonnel && j >= 0) {
    inputElements[j].click();
    --j;

    if (
      setting.key === null &&
      inputElements.length - setting.numberOfSelectedPersonnel <= MINIMAL_REMAINING_PERSONNEL_IN_POLICE_STATION
    ) {
      break;
    }
  }
}

function resetPersonnel(buildingId: string): void {
  const panelBody = getPanelBody(buildingId);
  if (!panelBody) return;

  const inputElements = panelBody.querySelectorAll<HTMLInputElement>("input:checked");

  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].click();
  }
}

async function panelHeadingClickEvent(event: Event): Promise<void> {
  const target = event.target as HTMLElement;

  // Skip redundant panelHeadingClick call which is handled by button click event
  if (
    target.classList.contains("personnel-select-button") ||
    target.classList.contains("personnel-reset-button") ||
    target.classList.contains("glyphicon-trash") ||
    target.classList.contains("glyphicon-user")
  ) {
    return;
  }

  let buildingIdElement = target.outerHTML.match(/building_id="(\d+)"/);
  if (buildingIdElement === null) {
    const parent = target.parentElement?.parentElement?.parentElement?.parentElement;
    if (parent) {
      buildingIdElement = parent.outerHTML.match(/building_id="(\d+)"/);
    }
  }

  if (buildingIdElement && buildingIdElement[1]) {
    await panelHeadingClick(buildingIdElement[1], true);
  }
}

async function panelHeadingClick(buildingId: string, toggle = false): Promise<void> {
  const panelHeading = getPanelHeading(buildingId);
  const panelBody = getPanelBody(buildingId);

  if (!panelHeading || !panelBody) return;

  const hrefMatch = panelHeading.outerHTML.match(/href="([^"]+)"/);
  if (!hrefMatch) return;

  const href = hrefMatch[1];

  if (loadedBuildings.indexOf(href) > -1) {
    if (toggle) {
      togglePanelBody(panelBody);
    }
    return;
  }

  loadedBuildings.push(href);

  // Use native fetch to load building data
  try {
    const response = await fetch(href);
    if (!response.ok) {
      console.error("Failed to load building data");
      return;
    }
    const data = await response.text();
    panelBody.innerHTML = data;
  } catch (error) {
    console.error("Error loading building data:", error);
    return;
  }

  const schoolingSelectAvailableButtons = panelBody.getElementsByClassName("schooling_select_available");
  for (let i = schoolingSelectAvailableButtons.length - 1; i >= 0; i--) {
    schoolingSelectAvailableButtons[i].parentElement?.remove();
  }

  addClickEventHandlerToCheckboxes();

  // Update button visibility based on available personnel
  await updateButtonVisibility(buildingId);

  if (toggle) {
    showPanelBody(panelBody);
  }
}

async function updateButtonVisibility(buildingId: string): Promise<void> {
  const panelBody = getPanelBody(buildingId);
  if (!panelBody) return;

  // Check which schooling types are available
  const availableSchoolings = new Set<string | null>();

  // Check for personnel without schooling
  const schoolingCells = panelBody.querySelectorAll<HTMLTableCellElement>("td[id^='school_personal_education_']");
  for (let j = 0; j < schoolingCells.length; j++) {
    const schoolingCell = schoolingCells[j];
    if (schoolingCell.innerHTML.replace(/\s/g, "").length === 0) {
      availableSchoolings.add(null);
      break;
    }
  }

  // Check for personnel with specific schoolings
  personnelSettingsProxy.forEach((setting) => {
    if (setting.key !== null) {
      const elements = panelBody.querySelectorAll<HTMLInputElement>(`input[${setting.key}='true']`);
      if (elements.length > 0) {
        availableSchoolings.add(setting.key);
      }
    }
  });

  // Show/hide buttons based on availability
  personnelSettingsProxy.forEach((setting) => {
    const button = document.getElementById(`personnel-select-button-${buildingId}-${setting.key}`);
    if (button) {
      button.style.display = availableSchoolings.has(setting.key) ? "" : "none";
    }
  });
}

function togglePanelBody(panelBody: HTMLElement): void {
  if (panelBody.classList.contains("hidden")) {
    panelBody.classList.remove("hidden");
  } else {
    panelBody.classList.add("hidden");
  }
}

function showPanelBody(panelBody: HTMLElement): void {
  if (panelBody.classList.contains("hidden")) {
    panelBody.classList.remove("hidden");
  }
}

function getPanelHeading(buildingId: string): HTMLElement | null {
  return document.querySelector(`.personal-select-heading[building_id='${buildingId}']`);
}

function getPanelBody(buildingId: string): HTMLElement | null {
  return document.querySelector(`.panel-body[building_id='${buildingId}']`);
}

async function main(): Promise<void> {
  if (!window.location.href.match(/\/buildings\/\d+\/hire/)) {
    return;
  }

  const h1 = document.querySelector<HTMLElement>("h1[building_type]");
  if (!h1 || h1.getAttribute("building_type") !== "11") {
    return;
  }

  initPanelBodies();
  removePanelHeadingClickEvent();
  addPersonnelSelector();
  addFooter();

  // Load current building personnel and prefill footer
  await loadCurrentBuildingPersonnel();
}

main();
