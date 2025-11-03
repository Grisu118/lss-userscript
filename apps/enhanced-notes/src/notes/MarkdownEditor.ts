import DOMPurify from "dompurify";
import { marked } from "marked";

/**
 * Simple Markdown Editor/Viewer component for the enhanced-notes app.
 *
 * Responsibilities
 * - Render sanitized Markdown using marked + DOMPurify
 * - Show a left sidebar with a generated ToC and an Edit button
 * - Sidebar and content scroll independently
 * - Edit mode with textarea in the center and Save/Cancel buttons in the sidebar
 *
 * Usage
 * ```ts
 * const root = document.getElementById("some-container")!;
 * const editor = new MarkdownEditor(root, initialMarkdown, async (text) => {
 *   await saveNotesSomewhere(text);
 * });
 * editor.render();
 * ```
 */
export class MarkdownEditor {
  private readonly root: HTMLElement;
  private content: string;
  private readonly onSave: (text: string) => void | Promise<void>;

  private container!: HTMLDivElement;
  private sidebar!: HTMLDivElement;
  private contentArea!: HTMLDivElement;
  private toolbar!: HTMLDivElement;
  private tocList!: HTMLUListElement;
  private editButton!: HTMLButtonElement;
  private saveButton!: HTMLButtonElement;
  private cancelButton!: HTMLButtonElement;
  private textarea!: HTMLTextAreaElement;

  private isEditing = false;

  constructor(root: HTMLElement, content: string, onSave: (text: string) => void | Promise<void>) {
    this.root = root;
    this.content = content ?? "";
    this.onSave = onSave;
  }

  public render(): void {
    // Clean previous mount if any
    this.container?.remove();

    // Container
    this.container = document.createElement("div");
    this.container.className = "md-editor";

    // Sidebar
    this.sidebar = document.createElement("div");
    this.sidebar.className = "md-editor__sidebar";

    // Toolbar (top of sidebar)
    this.toolbar = document.createElement("div");
    this.toolbar.className = "md-editor__toolbar";

    this.editButton = document.createElement("button");
    this.editButton.type = "button";
    this.editButton.className = "md-editor__btn md-editor__btn--primary";
    this.editButton.textContent = "Edit";
    this.editButton.addEventListener("click", () => this.enterEditMode());

    this.saveButton = document.createElement("button");
    this.saveButton.type = "button";
    this.saveButton.className = "md-editor__btn md-editor__btn--success";
    this.saveButton.textContent = "Save";
    this.saveButton.style.display = "none";
    this.saveButton.addEventListener("click", () => this.handleSave());

    this.cancelButton = document.createElement("button");
    this.cancelButton.type = "button";
    this.cancelButton.className = "md-editor__btn";
    this.cancelButton.textContent = "Cancel";
    this.cancelButton.style.display = "none";
    this.cancelButton.addEventListener("click", () => this.exitEditMode());

    this.toolbar.append(this.editButton, this.saveButton, this.cancelButton);

    // ToC list
    const tocHeader = document.createElement("div");
    tocHeader.className = "md-editor__toc-title";
    tocHeader.textContent = "Table of Contents";

    this.tocList = document.createElement("ul");
    this.tocList.className = "md-editor__toc";

    // Sidebar assembly
    this.sidebar.append(this.toolbar, tocHeader, this.tocList);

    // Content area
    this.contentArea = document.createElement("div");
    this.contentArea.className = "md-editor__content";

    // Textarea for edit mode (initially hidden)
    this.textarea = document.createElement("textarea");
    this.textarea.className = "md-editor__textarea";
    this.textarea.value = this.content;
    this.textarea.style.display = "none";

    // Compose
    this.container.append(this.sidebar, this.contentArea, this.textarea);
    this.root.appendChild(this.container);

    // Initial render in view mode
    this.renderMarkdown();
    this.buildToc();
  }

  private async handleSave(): Promise<void> {
    const newText = this.textarea.value;
    this.saveButton.disabled = true;
    this.saveButton.textContent = "Saving...";
    try {
      await this.onSave(newText);
      this.content = newText;
      this.exitEditMode();
      this.renderMarkdown();
      this.buildToc();
    } catch (e) {
      console.error("Failed to save notes", e);
      // basic feedback
      alert("Failed to save. See console for details.");
    } finally {
      this.saveButton.disabled = false;
      this.saveButton.textContent = "Save";
    }
  }

  private enterEditMode(): void {
    if (this.isEditing) return;
    this.isEditing = true;

    // Toggle buttons
    this.editButton.style.display = "none";
    this.saveButton.style.display = "inline-flex";
    this.cancelButton.style.display = "inline-flex";

    // Show textarea, hide rendered content
    this.textarea.value = this.content;
    this.textarea.style.display = "block";
    this.contentArea.style.display = "none";

    // Focus textarea
    setTimeout(() => this.textarea.focus(), 0);
  }

  private exitEditMode(): void {
    if (!this.isEditing) return;
    this.isEditing = false;

    // Toggle buttons
    this.editButton.style.display = "inline-flex";
    this.saveButton.style.display = "none";
    this.cancelButton.style.display = "none";

    // Hide textarea, show rendered content
    this.textarea.style.display = "none";
    this.contentArea.style.display = "block";
  }

  private renderMarkdown(): void {
    // Configure marked options if desired
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const rawHtml = marked.parse(this.content ?? "");
    const cleanHtml = DOMPurify.sanitize(String(rawHtml), {
      USE_PROFILES: { html: true },
      ADD_ATTR: ["target", "id", "class"],
      ADD_TAGS: ["svg", "path"],
    });

    this.contentArea.innerHTML = cleanHtml;

    // Ensure headings have ids for ToC
    this.ensureHeadingIds();
  }

  private ensureHeadingIds(): void {
    const headings = this.contentArea.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6");
    const used = new Set<string>();
    headings.forEach((h) => {
      if (!h.id) {
        const base = this.slugify(h.textContent || "");
        let candidate = base;
        let i = 2;
        while (used.has(candidate)) {
          candidate = `${base}-${i++}`;
        }
        h.id = candidate;
        used.add(candidate);
      }
    });
  }

  private buildToc(): void {
    // Clear
    this.tocList.innerHTML = "";

    const headings = Array.from(this.contentArea.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"));
    if (headings.length === 0) {
      const empty = document.createElement("li");
      empty.className = "md-editor__toc-empty";
      empty.textContent = "No headings";
      this.tocList.appendChild(empty);
      return;
    }

    headings.forEach((h) => {
      const level = Number(h.tagName.substring(1));
      const li = document.createElement("li");
      li.className = `md-editor__toc-item md-editor__toc-item--h${level}`;
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent ?? "";
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const target = this.contentArea.querySelector<HTMLElement>(`#${CSS.escape(h.id)}`);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      li.appendChild(a);
      this.tocList.appendChild(li);
    });
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }
}
