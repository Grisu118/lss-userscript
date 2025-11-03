import { NotesManager } from "../notes/NotesManager";
import { InlineMarkdownEditor } from "./InlineMarkdownEditor";
import { LinkEditor } from "./LinkEditor";

export const BuildingApp = async () => {
  // extract building id from url
  const buildingId = parseInt(window.location.pathname.split("/").pop() ?? "");
  if (isNaN(buildingId)) {
    throw new Error("Could not extract building id from url");
  }

  const parentContainer = document.querySelector<HTMLDataListElement>(".container-fluid > .dl-horizontal");
  if (!parentContainer) {
    throw new Error("Could not find parent container");
  }

  createOrGetElement(parentContainer, "dt", "enh-notes-link-label", "Link:");
  const linkDd = createOrGetElement(parentContainer, "dd", "enh-notes-link-content");

  createOrGetElement(parentContainer, "dt", "enh-notes-label", "Notizen:");
  const notesDd = createOrGetElement(parentContainer, "dd", "enh-notes-content");

  const notesManager = await NotesManager.of();
  const linkEditor = new LinkEditor(
    linkDd,
    () => notesManager.getBuildingNotes(buildingId)?.link ?? "",
    (link) => notesManager.saveBuildingLink(buildingId, link),
  );

  const notesEditor = new InlineMarkdownEditor(
    notesDd,
    () => notesManager.getBuildingNotes(buildingId)?.notes ?? "",
    (notes) => notesManager.saveBuildingNotes(buildingId, notes),
  );

  linkEditor.render();
  notesEditor.render();
};

const createOrGetElement = <K extends keyof HTMLElementTagNameMap>(
  parent: HTMLElement,
  tagName: K,
  id: string,
  content?: string,
): HTMLElementTagNameMap[K] => {
  // remove existing element if it exists
  const existing = parent.querySelector(`#${id}`);
  existing?.remove();

  const elem = document.createElement(tagName);
  elem.id = id;
  if (content) {
    elem.innerText = content;
  }

  parent.append(elem);
  return elem;
};
