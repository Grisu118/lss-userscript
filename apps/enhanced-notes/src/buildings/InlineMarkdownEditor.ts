import DOMPurify from "dompurify";
import { marked } from "marked";

export class InlineMarkdownEditor {
  private static readonly ID_PREFIX = "ls42-inline-md-editor-";
  private static readonly TEXT_AREA_ID = `${InlineMarkdownEditor.ID_PREFIX}textarea`;
  private static readonly CONTENT_ID = `${InlineMarkdownEditor.ID_PREFIX}content`;
  private static readonly EDIT_BTN_ID = `${InlineMarkdownEditor.ID_PREFIX}edit-btn`;
  private static readonly SAVE_BTN_ID = `${InlineMarkdownEditor.ID_PREFIX}save-btn`;

  private readonly parentElement: HTMLElement;
  private readonly getNotes: () => string;
  private readonly onSave: (link: string) => Promise<void>;

  private isEditing = false;

  constructor(parentElement: HTMLElement, getNotes: () => string, onSave: (notes: string) => Promise<void>) {
    this.parentElement = parentElement;
    this.getNotes = getNotes;
    this.onSave = onSave;
  }

  public render() {
    document.getElementById(InlineMarkdownEditor.EDIT_BTN_ID)?.remove();
    document.getElementById(InlineMarkdownEditor.SAVE_BTN_ID)?.remove();
    document.getElementById(InlineMarkdownEditor.TEXT_AREA_ID)?.remove();
    document.getElementById(InlineMarkdownEditor.CONTENT_ID)?.remove();

    const notes = this.getNotes();

    if (this.isEditing) {
      const saveBtn = this.createSaveBtn();
      const textArea = document.createElement("textarea");
      textArea.id = InlineMarkdownEditor.TEXT_AREA_ID;
      textArea.value = notes;
      textArea.addEventListener("keydown", (e) => {
        // if esc is pressed, cancel edit mode
        if (e.key === "Escape") {
          this.isEditing = false;
          this.render();
          return;
        } else if (e.ctrlKey && e.key === "Enter") {
          // if ctrl+enter is pressed, save and exit edit mode
          e.preventDefault();
          this.save();
        }
      });
      this.parentElement.appendChild(saveBtn);
      this.parentElement.appendChild(textArea);
      textArea.focus();
    } else {
      const editBtn = this.createEditBtn();
      const contentElement = document.createElement("div");
      contentElement.id = InlineMarkdownEditor.CONTENT_ID;
      // Configure marked options if desired
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      const rawHtml = marked.parse(notes ?? "");
      const cleanHtml = DOMPurify.sanitize(String(rawHtml), {
        USE_PROFILES: { html: true },
        ADD_ATTR: ["target", "id", "class"],
        ADD_TAGS: ["svg", "path"],
      });

      contentElement.innerHTML = cleanHtml;

      this.parentElement.appendChild(editBtn);
      this.parentElement.appendChild(contentElement);
    }
  }

  private createIconButton(id: string, iconClass: string): HTMLButtonElement {
    const btn = document.createElement("button");
    const icon = document.createElement("i");
    icon.className = iconClass;
    btn.id = id;
    btn.className = "btn btn-default btn-xs";
    btn.appendChild(icon);
    return btn;
  }

  private createEditBtn(): HTMLButtonElement {
    const btn = this.createIconButton(InlineMarkdownEditor.EDIT_BTN_ID, "glyphicon glyphicon-pencil");
    btn.addEventListener("click", () => {
      this.isEditing = true;
      this.render();
    });
    return btn;
  }

  private createSaveBtn(): HTMLButtonElement {
    const btn = this.createIconButton(InlineMarkdownEditor.SAVE_BTN_ID, "glyphicon glyphicon-floppy-disk");
    btn.addEventListener("click", this.save);
    return btn;
  }

  private save = async () => {
    const textArea = document.getElementById(InlineMarkdownEditor.TEXT_AREA_ID) as HTMLInputElement;
    await this.onSave(textArea.value);
    this.isEditing = false;
    this.render();
  };
}
