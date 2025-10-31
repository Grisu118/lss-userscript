import { MarkdownEditor } from "./MarkdownEditor";
import { NotesManager } from "./NotesManager";

export const NotesApp = () => {
  // hide existing ui
  const form = document.querySelector("form");
  if (form && form.parentElement) {
    form.parentElement.style.display = "none";
  }

  const textarea = document.querySelector("textarea");
  const rawNotes = (textarea as HTMLTextAreaElement | null)?.value ?? "";
  const manager = NotesManager.ofRawNotes(rawNotes);

  // Create a mount container below the original form location
  const mount = document.createElement("div");
  mount.id = "enh-notes-root";
  document.body.append(mount);

  const editor = new MarkdownEditor(mount, manager.getNotes(), async (text) => {
    await manager.saveNotes(text);
  });
  editor.render();
};
