import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');

test('uses an OpenFreeMap basemap instead of the blocked OSM raster endpoint', () => {
  assert.doesNotMatch(html, /tile\.openstreetmap\.org/);
  assert.match(html, /https:\/\/tiles\.openfreemap\.org\/styles\/liberty/);
  assert.match(html, /L\.maplibreGL\(/);
});

test('loads MapLibre and its Leaflet bridge with pinned versions', () => {
  assert.match(html, /maplibre-gl@5\.24\.0/);
  assert.match(html, /@maplibre\/maplibre-gl-leaflet@0\.1\.4/);
});

test('lets visitors collapse the cell list from the panel header', () => {
  assert.match(html, /classList\.toggle\("collapsed"/);
  assert.match(html, /\.panel\.collapsed \.search-wrap/);
});

test('frames all places at startup without drawing the municipality outline', () => {
  assert.doesNotMatch(html, /L\.polygon\(latlngs/);
  assert.match(html, /const PLACE_BOUNDS = L\.latLngBounds\(PLACES\.map/);
  assert.match(html, /map\.fitBounds\(PLACE_BOUNDS/);
});

test('uses mobile layout as the base and layers desktop rules above 641px', () => {
  assert.match(html, /height: 76dvh/);
  assert.match(html, /@media \(min-width: 641px\)/);
});

test('keeps place details compact enough to scan without a drawer scroll', () => {
  assert.match(html, /\.drawer-body\.compact-details/);
  assert.match(html, /\.gallery:empty \{ display: none; \}/);
  assert.match(html, /hero\.style\.height = "clamp\(112px, 20dvh, 184px\)"/);
});

test('uses a compact hamburger control to open the cell sidebar', () => {
  assert.match(html, /class="panel minimal collapsed"/);
  assert.match(html, /class="menu-icon"/);
  assert.match(html, /\.panel\.collapsed \{ width: 52px; height: 52px; \}/);
});

test('organizes each place detail into information and action columns', () => {
  assert.match(html, /class="detail-grid"/);
  assert.match(html, /class="place-info"/);
  assert.match(html, /\.compact-details \.detail-grid \{ display: grid; grid-template-columns:/);
});

test('includes Jardim da Emunah with its weekly location and time', () => {
  assert.match(html, /name: "Jardim da Emunah"/);
  assert.match(html, /schedule: "Quarta-feira, 20h"/);
  assert.match(html, /Rua Carlos Kirch, 160 - Passa Vinte, Palhoça - SC/);
});
