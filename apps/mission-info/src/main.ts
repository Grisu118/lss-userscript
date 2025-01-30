import { getMissions } from "@lss/storage";
import dayjs from "dayjs";
import "./style.css";

import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const MISSION_ID_REGEX = /.*\/einsaetze\/(\d+)\?.*/;

async function missionInfoNodes() {
  const linkElem = document.getElementById("mission_help") as HTMLAnchorElement;

  if (!linkElem) {
    return undefined;
  }

  const link = linkElem.href;

  console.log("link", link, linkElem);

  const params = new URLSearchParams(link.split("?")[1]);
  let missionId = link.match(MISSION_ID_REGEX)?.[1];
  const variant = params.get("additive_overlays");
  if (variant) {
    missionId += `/${variant}`;
  }

  console.log("MissionId", missionId);

  const missions = await getMissions();
  const mission = missions.data.find((mission) => mission.id == missionId);

  const creditsElem = document.createElement("span");
  creditsElem.innerText = `Credits: ${mission?.average_credits}`;

  return [creditsElem];
}

function generationTime(missionInfo: HTMLElement) {
  const generationTimeString = missionInfo.getAttribute("data-generation-time");
  const generationTime = dayjs(generationTimeString);
  const now = dayjs();
  const cutOffTime = now.hour(3).minute(0).second(0);

  // diff in ms
  const diff = now.diff(generationTime);
  const duration = dayjs.duration(diff);

  let formattedTxt = "";
  if (duration.asMinutes() < 1) {
    formattedTxt = "jetzt";
  } else if (duration.asHours() < 1) {
    formattedTxt = `vor ${Math.floor(duration.asMinutes())} Minuten`;
  } else if (duration.asHours() < 3) {
    formattedTxt = `vor ${Math.floor(duration.asHours())} Stunden`;
  } else if (generationTime.isSame(now, "day")) {
    formattedTxt = `heute um ${generationTime.format("HH:mm:ss")}`;
  } else if (generationTime.isSame(now.subtract(1, "day"), "day")) {
    formattedTxt = `gestern um ${generationTime.format("HH:mm:ss")}`;
  } else {
    formattedTxt = generationTime.format("DD.MM.YYYY HH:mm:ss");
  }

  const timeNode = document.createElement("span");

  if (generationTime.isBefore(cutOffTime)) {
    timeNode.classList.add("ls42-lss-mission-generation-time-danger");
  }

  timeNode.innerText = `Generierungszeit: ${formattedTxt}`;
  return timeNode;
}

function separator() {
  const separator = document.createElement("span");
  separator.innerText = " | ";

  return separator;
}

(async () => {
  const missionInfo = document.getElementById("mission_general_info");
  if (!missionInfo) {
    return;
  }

  const targetElement = missionInfo.querySelector<HTMLSpanElement>(":scope > small");

  const timeNode = generationTime(missionInfo);
  const missionNodes = await missionInfoNodes();
  missionNodes?.forEach((node) => {
    targetElement?.appendChild(separator());
    targetElement?.appendChild(node);
  });

  targetElement?.appendChild(separator());
  targetElement?.appendChild(timeNode);
})();
