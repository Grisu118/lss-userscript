import "./style.css";
import { fetchBuildings } from "./buildings/api";
import { drawBuildingsOfControlCenter } from "./buildings/controlCenter";

(() => {
  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).drawLstBuildings = async (id: number, force?: boolean): Promise<void> => {
    const buildings = await fetchBuildings(force ?? false);
    const markers = drawBuildingsOfControlCenter(id, buildings);
    if (map) {
      markers.forEach((m) => m.addTo(map));
    }
  };
})();
