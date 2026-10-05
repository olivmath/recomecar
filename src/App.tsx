import { useCallback, useMemo, useState } from "react";
import { Cross, Menu } from "lucide-react";
import { cells, type Cell } from "./data/cells";
import { CellDetails } from "./components/cell-details";
import { CellsMap } from "./components/cells-map";
import { CellsSidebar } from "./components/cells-sidebar";

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Cell | null>(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return normalized
      ? cells.filter((cell) =>
          `${cell.name} ${cell.day} ${cell.time} ${cell.address}`
            .toLocaleLowerCase("pt-BR")
            .includes(normalized)
        )
      : cells;
  }, [query]);
  const selectCell = useCallback((cell: Cell) => {
    setSelected(cell);
    if (window.innerWidth < 720) setMenuOpen(false);
  }, []);

  return (
    <main className="app-shell">
      <CellsMap cells={filtered} selected={selected} onSelect={selectCell} />
      <a className="wordmark" href="#top" aria-label="Igreja Recomeçar">
        <Cross size={17} /> Igreja Recomeçar
      </a>
      {!menuOpen && (
        <button className="menu-launch" type="button" onClick={() => setMenuOpen(true)}>
          <Menu size={19} /> Ver células
        </button>
      )}
      <CellsSidebar
        cells={filtered}
        activeId={selected?.id}
        open={menuOpen}
        query={query}
        onQueryChange={setQuery}
        onSelect={selectCell}
        onToggle={() => setMenuOpen(false)}
      />
      <CellDetails cell={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
