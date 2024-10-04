import "./style.css";

const sanitizeString = (txt: string): string => txt.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");

const matchClassName = "ls42-lss-aao-match";

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
        elem.classList.add(matchClassName);
      } else {
        elem.classList.add("ls42-lss-aao-no-match");
      }
    });
  }

  const aaoTabPane = document.querySelector<HTMLAnchorElement>(`.tab-pane:has(.aao.${matchClassName})`);
  if (aaoTabPane) {
    const aaoCatId = aaoTabPane.id;
    const aaoTabElem = document.querySelector<HTMLAnchorElement>(`#aao-tabs a[href="#${aaoCatId}"]`);
    aaoTabElem?.classList?.add("ls42-lss-aao-category-match");
  }

  const resetAAO = () => {
    document.querySelector<HTMLAnchorElement>(`.aao[reset="true"]`)?.click();
  };

  const applyMatchedAAO = () => {
    const aaoElem = document.querySelector<HTMLAnchorElement>(`.aao.${matchClassName}`);
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
    }
  });
})();
