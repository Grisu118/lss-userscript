import "./style.css";

(() => {
  function onClick(event: MouseEvent) {
    const badgeClass = "g118-aao-badge";
    let target = event.target as HTMLAnchorElement;
    if (target.tagName === "SPAN") {
      target = target.parentElement as HTMLAnchorElement;
    }

    if (target.getAttribute("reset") === "true") {
      // reset btn clicked => remove all badges
      document
        .querySelectorAll<HTMLDivElement>(`.${badgeClass}`)
        .forEach((elem) => elem.remove());
    } else {
      const badge = target.querySelector<HTMLDivElement>(`.${badgeClass}`);
      if (badge) {
        let currentValue = Number.parseInt(badge.innerText);
        if (Number.isNaN(currentValue)) {
          currentValue = 0;
        }
        badge.textContent = (currentValue + 1).toString();
      } else {
        const newBadge = document.createElement("div");
        newBadge.className = badgeClass;
        newBadge.innerText = "1";
        target.append(newBadge);
      }
    }
  }

  document.querySelectorAll<HTMLAnchorElement>(".btn.aao").forEach((elem) => {
    elem.addEventListener("click", onClick);
  });
})();
