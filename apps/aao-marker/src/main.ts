import "./style.css";
import { checkMedicIncluded } from "./checkMedicIncluded";

const sanitizeString = (txt: string): string => txt.replace(/[#-.]|[[-^]|[?|{}]/g, "\\$&");
const CALCULATE_TIME = !!document.querySelector(".aao_timer");

const MATCH_CLASS_NAME = "ls42-lss-aao-match";
const MAX_AAO_RETRIES = 6;

const applyAAOStatus = (statusBtn: HTMLAnchorElement) => {
  const result = aao_available(Number.parseInt(statusBtn.getAttribute("aao_id") ?? "-1"), CALCULATE_TIME);
  console.log("applyAAOStatus", result);

  const aaoElem = document.querySelector<HTMLAnchorElement>(`.aao.${MATCH_CLASS_NAME}`);

  if (aaoElem) {
    const aaoAvailable = result.all_ok;
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
    // mark aao tab title
    const aaoCatId = aaoTabPane.id;
    const aaoTabElem = document.querySelector<HTMLAnchorElement>(`#aao-tabs a[href="#${aaoCatId}"]`);
    aaoTabElem?.classList?.add("ls42-lss-aao-category-match");

    // mark all tab-pane elements so that the darkening works
    document.querySelectorAll("#mission-aao-group .tab-pane").forEach((elem) => {
      elem.classList.add("ls42-lss-aao-match-found");
    });
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

    parentElem?.prepend(aaoStatusBtn);

    const vehicleListStep = document.getElementsByClassName("missing_vehicles_load").item(0);
    if (vehicleListStep) {
      let retryCount = 0;
      let activeRunId = 0;
      let pendingTimeoutId: number | undefined;

      const scheduleAAOCheck = () => {
        activeRunId += 1;
        const runId = activeRunId;

        if (pendingTimeoutId !== undefined) {
          window.clearTimeout(pendingTimeoutId);
        }

        pendingTimeoutId = window.setTimeout(async () => {
          // ignore stale scheduled runs
          if (runId !== activeRunId) {
            return;
          }

          console.log("requestAnimationFrame");
          const jobs: Job[] = [];
          let cache: AAOAvailableResult | undefined;

          // aao check job
          jobs.push({
            type: "regular",
            func: () => {
              console.log("checking aao status");
              cache = aao_available(aaoId, false);
              console.log("checking aao status done", cache);
            },
          });

          jobs.push({
            type: "reflow",
            func: () => {
              // ignore stale runs if a newer observer event happened
              if (runId !== activeRunId) {
                return;
              }

              if (cache && cache.max_time > 0) {
                console.log("reflow: checking aao status done", cache);
                retryCount = 0;
                if (aaoStatusBtn) {
                  applyAAOStatus(aaoStatusBtn);
                }
              } else if (retryCount < MAX_AAO_RETRIES) {
                retryCount += 1;
                console.log(`requeue AAO check ${retryCount}/${MAX_AAO_RETRIES}`);
                scheduleAAOCheck();
              } else {
                console.log("AAO check stopped after max retries", MAX_AAO_RETRIES);
              }
            },
          });

          await runYieldingJobs(jobs);
        }, 500);
      };

      const observer = new MutationObserver(() => {
        if (aaoStatusBtn) {
          scheduleAAOCheck();
        }
      });
      observer.observe(vehicleListStep, { childList: true, subtree: true });
      // schedule a first check, as first result is not always correct
      scheduleAAOCheck();
    }
  }

  const resetAAO = () => {
    document.querySelector<HTMLAnchorElement>(`.aao[reset="true"]`)?.click();
  };

  const applyMatchedAAO = () => {
    aaoElem?.click();
  };

  // add key event listener
  document.addEventListener("keypress", (ev) => {
    const target = ev.target as HTMLElement;
    // description is a div with role textbox
    if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
      // we are typing text, so do nothing
      return;
    }

    switch (ev.key) {
      case "r":
        resetAAO();
        ev.stopPropagation();
        break;
      case "v":
        applyMatchedAAO();
        ev.stopPropagation();
        break;
    }
  });
})();
