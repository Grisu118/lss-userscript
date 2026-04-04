interface Window {
  tellParent(code: string): void;
  lightboxClose(): void;
}

interface AAOAvailableResult {
  aao_id: number;
  all_ok: boolean;
  max_time: number;
}

function aao_available(aaoId: number, calculateTime: boolean): AAOAvailableResult;

interface Job {
  type: "regular" | "reflow";
  func: () => void;
}

async function runYieldingJobs(jobs: Job[]): Promise<void>;

async function aao_update_after_click(aao_id: number): Promise<void>;
