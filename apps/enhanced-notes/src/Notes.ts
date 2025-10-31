export interface Notes {
  version: number;
  /**
   * The general notes, showed on /note page.
   */
  notes: string;
  /**
   * The notes for buildings
   */
  buildings: Record<string, BuildingNote>;
}

export interface BuildingNote {
  /**
   * A link to be displayed on the building page
   */
  link?: string;
  /**
   * The notes for the building
   */
  notes: string;
}
