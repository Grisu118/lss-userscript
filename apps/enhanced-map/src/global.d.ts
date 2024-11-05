import { L, Map } from "leaflet";

declare global {
  const map: Map | undefined;
  const L: L;
}
