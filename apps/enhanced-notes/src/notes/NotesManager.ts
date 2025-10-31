import { loadForm, modifyForm } from "@lss/api";
import { BuildingNote, Notes } from "../Notes";

export class NotesManager {
  private static readonly NOTES_FORM_KEY = "note[message]";
  private static readonly NOTES_URL = "/note";
  private readonly notes: Notes;

  private constructor(rawNotes: string) {
    this.notes = NotesManager.parseNotes(rawNotes);
  }

  public static ofRawNotes(rawNotes: string): NotesManager {
    return new NotesManager(rawNotes);
  }

  public static async of(): Promise<NotesManager> {
    const form = await loadForm(NotesManager.NOTES_URL);
    return new NotesManager(form.data.get(NotesManager.NOTES_FORM_KEY)?.toString() ?? "");
  }

  public getNotes(): string {
    return this.notes.notes;
  }

  public getBuildingNotes(id: number): BuildingNote {
    return this.notes.buildings[id];
  }

  public async saveBuildingNote(id: number, notes: BuildingNote): Promise<void> {
    this.notes.buildings[id] = notes;
    await this.save();
  }

  public async saveNotes(notes: string): Promise<void> {
    this.notes.notes = notes;
    await this.save();
  }

  private async save(): Promise<Response> {
    return modifyForm(`/note`, (formData) => {
      const rawOldNotes = formData.get(NotesManager.NOTES_FORM_KEY)?.toString() ?? "";
      const parsedOldNotes = NotesManager.parseNotes(rawOldNotes);
      if (parsedOldNotes.version !== this.notes.version) {
        throw new Error("Notes version mismatch");
      }
      // update version
      this.notes.version = this.notes.version + 1;
      formData.set(NotesManager.NOTES_FORM_KEY, JSON.stringify(this.notes, null, 2));
    });
  }

  private static parseNotes(rawNotes: string): Notes {
    try {
      return JSON.parse(rawNotes);
    } catch (e) {
      // If parsing fails we assume this is a new install
      if (rawNotes.startsWith("{")) {
        // parsing failed, but looks like a json object. So we will not mess with the notes.
        console.error("Failed to parse notes:", e);
        throw e;
      } else {
        return {
          version: 0,
          notes: rawNotes,
          buildings: {},
        };
      }
    }
  }
}
