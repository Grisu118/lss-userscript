export interface Building {
  id: number;
  personal_count: number;
  level: number;
  building_type: number;
  caption: string;
  latitude: number;
  longitude: number;
  extensions: Extension[];
  storage_upgrades: StorageUpgrade[];
  leitstelle_building_id: number;
  small_building: boolean;
  enabled: boolean;
  personal_count_target: number;
  hiring_phase: number;
  hiring_automatic: boolean;
  schoolings: Schooling[];
  complex_type: string;
  generates_mission_categories: string[];
}

export interface Extension {
  caption: string;
  available: boolean;
  enabled: boolean;
  type_id: number;
}

export interface StorageUpgrade {
  upgrade_type: string;
  available: boolean;
  type_id: string;
}

export interface Schooling {
  id: number;
  education_id: number;
  education: string;
  education_start_time: string;
  education_end_time: string;
}
