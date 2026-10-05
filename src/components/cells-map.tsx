import { useEffect, useRef } from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "maplibre-gl";
import "@maplibre/maplibre-gl-leaflet";
import type { Cell } from "../data/cells";

type Props = { cells: Cell[]; selected: Cell | null; onSelect: (cell: Cell) => void };

export function CellsMap({ cells, selected, onSelect }: Props) {
  const node = useRef<HTMLDivElement>(null); const map = useRef<L.Map | null>(null); const markers = useRef<L.LayerGroup | null>(null);
  useEffect(() => { if (!node.current || map.current) return; const instance = L.map(node.current, { zoomControl: false, attributionControl: true, preferCanvas: true });
    L.control.zoom({ position: "bottomright" }).addTo(instance);
    L.maplibreGL({ style: "https://tiles.openfreemap.org/styles/liberty" }).addTo(instance);
    map.current = instance; markers.current = L.layerGroup().addTo(instance); return () => { instance.remove(); map.current = null; };
  }, []);
  useEffect(() => { if (!map.current || !markers.current) return; markers.current.clearLayers(); const bounds: [number, number][] = [];
    cells.forEach((cell) => { bounds.push(cell.coordinates); const symbol = cell.icon === "cross" ? "✝" : "✦"; const label = cell.name.replace(/^Célula\s+/i, ""); const marker = L.marker(cell.coordinates, { icon: L.divIcon({ className: "", html: `<button class="map-marker" style="--marker-color:${cell.color}" aria-label="${cell.name}"><span>${symbol}</span><span class="map-label">${label}</span></button>`, iconSize: [38, 38], iconAnchor: [19, 38] }) }); marker.on("click", () => onSelect(cell)); marker.addTo(markers.current!); });
    if (bounds.length) map.current.fitBounds(bounds, { padding: [64, 64], maxZoom: 13 });
  }, [cells, onSelect]);
  useEffect(() => { if (selected && map.current) map.current.flyTo(selected.coordinates, Math.max(map.current.getZoom(), 14), { duration: 0.55 }); }, [selected]);
  return <div className="map" ref={node} />;
}
