import { NotesManager } from "./NotesManager";

export const NotesApp = () => {
  const form = document.querySelector("form");
  if (form) {
    form.style = "display: none";
  }

  const textarea = document.querySelector("textarea");
  const rawNotes = textarea?.value;
  if (!rawNotes) {
    throw new Error("No notes found");
  }
  const manager = NotesManager.ofRawNotes(rawNotes);

  // draw ui
};
