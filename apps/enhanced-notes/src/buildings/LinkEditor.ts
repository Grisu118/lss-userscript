export class LinkEditor {
  private static readonly ID_PREFIX = "ls42-link-editor-";
  private static readonly INPUT_ID = `${LinkEditor.ID_PREFIX}input`;
  private static readonly LINK_ID = `${LinkEditor.ID_PREFIX}link`;
  private static readonly EDIT_BTN_ID = `${LinkEditor.ID_PREFIX}edit-btn`;
  private static readonly SAVE_BTN_ID = `${LinkEditor.ID_PREFIX}save-btn`;

  private readonly parentElement: HTMLElement;
  private readonly getLink: () => string;
  private readonly onSave: (link: string) => Promise<void>;

  private isEditing = false;

  constructor(parentElement: HTMLElement, getLink: () => string, onSave: (link: string) => Promise<void>) {
    this.parentElement = parentElement;
    this.getLink = getLink;
    this.onSave = onSave;
  }

  public render() {
    document.getElementById(LinkEditor.EDIT_BTN_ID)?.remove();
    document.getElementById(LinkEditor.SAVE_BTN_ID)?.remove();
    document.getElementById(LinkEditor.INPUT_ID)?.remove();
    document.getElementById(LinkEditor.LINK_ID)?.remove();

    const link = this.getLink();

    if (this.isEditing) {
      const saveBtn = this.createSaveBtn();
      const linkInput = document.createElement("input");
      linkInput.id = LinkEditor.INPUT_ID;
      linkInput.type = "text";
      linkInput.placeholder = "Link";
      linkInput.value = link;
      linkInput.addEventListener("keydown", (e) => {
        // if esc is pressed, cancel edit mode
        if (e.key === "Escape") {
          e.preventDefault();
          this.isEditing = false;
          this.render();
        } else if (e.ctrlKey && e.key === "Enter") {
          e.preventDefault();
          this.save();
        }
      });
      this.parentElement.appendChild(saveBtn);
      this.parentElement.appendChild(linkInput);
      linkInput.focus();
    } else {
      const editBtn = this.createEditBtn();
      const aElement = document.createElement("a");
      aElement.id = LinkEditor.LINK_ID;
      aElement.href = link;
      aElement.textContent = link;
      this.parentElement.appendChild(editBtn);
      this.parentElement.appendChild(aElement);
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
    const btn = this.createIconButton(LinkEditor.EDIT_BTN_ID, "glyphicon glyphicon-pencil");
    btn.addEventListener("click", () => {
      this.isEditing = true;
      this.render();
    });
    return btn;
  }

  private createSaveBtn(): HTMLButtonElement {
    const btn = this.createIconButton(LinkEditor.SAVE_BTN_ID, "glyphicon glyphicon-floppy-disk");
    btn.addEventListener("click", this.save);
    return btn;
  }

  private save = async () => {
    const linkInput = document.getElementById(LinkEditor.INPUT_ID) as HTMLInputElement;
    await this.onSave(linkInput.value);
    this.isEditing = false;
    this.render();
  };
}
