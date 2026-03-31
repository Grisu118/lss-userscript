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
