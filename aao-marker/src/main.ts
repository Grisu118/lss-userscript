import "./style.css";

const sanitizeString = (txt: string): string => txt.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");

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
        elem.classList.add("ls42-lss-aao-match");
      } else {
        elem.classList.add("ls42-lss-aao-no-match");
      }
    });
  }

  const matchElem = document.querySelector<HTMLAnchorElement>(".tab-pane:has(.aao.ls42-lss-aao-match)");
  if (matchElem) {
    const aaoId = matchElem.id;
    const aaoTabElem = document.querySelector<HTMLAnchorElement>(`#aao-tabs a[href="#${aaoId}"]`);
    aaoTabElem?.classList?.add("ls42-lss-aao-category-match");
  }
})();
