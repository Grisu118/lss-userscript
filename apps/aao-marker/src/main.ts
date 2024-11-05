import "./style.css";
import { checkMedicIncluded } from "./checkMedicIncluded";

const sanitizeString = (txt: string): string => txt.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
const CALCULATE_TIME = !!document.querySelector(".aao_timer");

const MATCH_CLASS_NAME = "ls42-lss-aao-match";

const applyAAOStatus = (statusBtn: HTMLAnchorElement) => {
  aao_available(Number.parseInt(statusBtn.getAttribute("aao_id") ?? "-1"), CALCULATE_TIME);

  const aaoElem = document.querySelector<HTMLAnchorElement>(`.aao.${MATCH_CLASS_NAME}`);

  if (aaoElem) {
    const aaoAvailable = aaoElem.children.item(0)?.className?.includes("label-success") ?? false;
    const medicIncluded = checkMedicIncluded(aaoElem);

    statusBtn.classList.remove("btn-success");
    statusBtn.classList.remove("btn-danger");
    let text: string;
    if (aaoAvailable) {
      statusBtn.classList.add("btn-success");
      text = "✔️ AAO Available ✔️";
    } else {
      statusBtn.classList.add("btn-danger");
      text = "⚠️⚠️ AAO NOT COMPLETE ⚠️⚠️";
    }
    if (medicIncluded) {
      text = `🚑🚑 ${text} 🚑🚑`;
    }

    statusBtn.innerText = text;
  }
};

(() => {
  const missionGeneralInfoElem = document.getElementById("mission_general_info");

  const missionTitle = missionGeneralInfoElem
    ?.getAttribute("data-mission-title")
    // remove some special words
    ?.replace("[Verband]", "")
    ?.replace("[Event]", "")
    ?.replace("(Brandmeldeanlage)", "")
    ?.replace("ß", "ss")
    ?.trim()
    ?.toLowerCase();

  if (missionTitle) {
    document.querySelectorAll<HTMLAnchorElement>(".aao").forEach((elem) => {
      const aaoText = elem.textContent?.replace("ß", "ss")?.trim()?.toLowerCase();
      if (aaoText?.match(`^${sanitizeString(missionTitle)}\\*?$`)) {
        // we have a match
        elem.classList.add(MATCH_CLASS_NAME);
      } else {
        elem.classList.add("ls42-lss-aao-no-match");
      }
    });
  }

  const aaoTabPane = document.querySelector<HTMLAnchorElement>(`.tab-pane:has(.aao.${MATCH_CLASS_NAME})`);
  if (aaoTabPane) {
    const aaoCatId = aaoTabPane.id;
    const aaoTabElem = document.querySelector<HTMLAnchorElement>(`#aao-tabs a[href="#${aaoCatId}"]`);
    aaoTabElem?.classList?.add("ls42-lss-aao-category-match");
  }
  const aaoElem = document.querySelector<HTMLAnchorElement>(`.aao.${MATCH_CLASS_NAME}`);

  let aaoStatusBtn: HTMLAnchorElement | undefined;

  if (aaoElem) {
    // we have a match
    // enforce aao check
    const aaoId = Number.parseInt(aaoElem.getAttribute("aao_id") ?? "-1");
    const parentElem = document.getElementById("mission-aao-group");
    aaoStatusBtn = document.createElement("a");
    aaoStatusBtn.setAttribute("href", "#");
    aaoStatusBtn.setAttribute("aao_id", aaoId.toString());
    aaoStatusBtn.className = "btn btn-xs btn-block";
    aaoStatusBtn.addEventListener("click", () => applyMatchedAAO());

    applyAAOStatus(aaoStatusBtn);

    parentElem?.prepend(aaoStatusBtn);
  }

  const resetAAO = () => {
    document.querySelector<HTMLAnchorElement>(`.aao[reset="true"]`)?.click();
  };

  const applyMatchedAAO = () => {
    aaoElem?.click();
  };

  // add key event listener
  document.addEventListener("keypress", (ev) => {
    switch (ev.key) {
      case "r":
        resetAAO();
        break;
      case "v":
        applyMatchedAAO();
        break;
      case "n":
        if (aaoStatusBtn) {
          setTimeout(() => applyAAOStatus(aaoStatusBtn), 2000);
        }
        break;
    }
  });
})();
