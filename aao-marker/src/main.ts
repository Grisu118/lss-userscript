import "./style.css";

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
      if (aaoText?.startsWith(missionTitle)) {
        // we have a match
        elem.classList.add("ls42-lss-aao-match");
      }
    });
  }
})();
