import { getCostLimit, getMaxDistant } from "./storage";

export function blockHospitals(elem: HTMLDivElement): void {
  // block own hospitals
  elem.querySelectorAll("#own-hospitals tbody tr").forEach((elem) => {
    const cells = elem.children;
    const distant = extractDistant(cells);
    const hasRequiredDepartments = extractHospitalHasRequiredDepartments(cells);
    const btn = extractDispatchBtn(cells);

    if (distant > getMaxDistant() || !hasRequiredDepartments) {
      btn.className += " disabled";
      btn.setAttribute("disabled", "true");
    }
  });

  // block alliance hospitals with too high costs
  elem.querySelectorAll("#alliance-hospitals tbody tr").forEach((elem) => {
    const cells = elem.children;
    if (cells.length != 6) {
      // skip not complete rows (like the last one)
      return;
    }
    const distant = extractDistant(cells);
    const hasRequiredDepartments = extractHospitalHasRequiredDepartments(cells);
    const costPercent = Number.parseInt(
      cells.item(3)?.textContent?.trim()?.replace("%", "") ?? "100",
    );
    const btn = extractDispatchBtn(cells);

    if (
      distant > getMaxDistant() ||
      !hasRequiredDepartments ||
      costPercent > getCostLimit()
    ) {
      btn.className += " disabled";
      btn.setAttribute("disabled", "true");
    }
  });
}

function extractDistant(cells: HTMLCollection): number {
  return Number.parseFloat(
    cells.item(1)?.textContent?.trim()?.replace("km", "")?.replace(",", ".") ??
      "-1.0",
  );
}

function extractHospitalHasRequiredDepartments(cells: HTMLCollection): boolean {
  const text = cells.item(cells.length - 2)?.textContent?.trim();
  return text == "Ja";
}

function extractDispatchBtn(cells: HTMLCollection): HTMLAnchorElement {
  return cells.item(cells.length - 1)?.querySelector<HTMLAnchorElement>("a")!;
}
