import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const mapSource = await readFile(
  new URL("./src/components/cells-map.tsx", import.meta.url),
  "utf8",
);

test("creates the MapLibre layer with the bridge package factory", () => {
  assert.match(
    mapSource,
    /import \{ maplibreGL \} from "@maplibre\/maplibre-gl-leaflet"/,
  );
  assert.match(mapSource, /maplibreGL\(\{ style: "https:\/\/tiles\.openfreemap\.org\/styles\/liberty" \}\)/);
  assert.doesNotMatch(mapSource, /L\.maplibreGL\(/);
});
