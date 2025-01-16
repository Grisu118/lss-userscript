import dayjs from "dayjs";
import "./style.css";

import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

(() => {
  const missionInfo = document.getElementById("mission_general_info");
  if (!missionInfo) {
    return;
  }

  const generationTimeString = missionInfo.getAttribute("data-generation-time");
  const generationTime = dayjs(generationTimeString);
  const now = dayjs();
  const cutOffTime = now.hour(3).minute(0).second(0);

  // diff in ms
  const diff = now.diff(generationTime);
  const duration = dayjs.duration(diff);

  const targetElement = missionInfo.querySelector<HTMLSpanElement>(":scope > small");

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

  timeNode.innerText = ` | Generierungszeitpunkt: ${formattedTxt}`;
  targetElement?.appendChild(timeNode);
})();
