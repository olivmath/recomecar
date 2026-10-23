import { useCallback, useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { cells, type Cell } from "./data/cells";
import { CellDetails } from "./components/cell-details";
import { CellsMap } from "./components/cells-map";
import { CellsSidebar } from "./components/cells-sidebar";

const weekdays = [
  { label: "Seg", day: "Segunda-feira" },
  { label: "Ter", day: "Terça-feira" },
  { label: "Qua", day: "Quarta-feira" },
  { label: "Qui", day: "Quinta-feira" },
  { label: "Sex", day: "Sexta-feira" },
  { label: "Sáb", day: "Sábado" },
  { label: "Dom", day: "Domingo" },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selected, setSelected] = useState<Cell | null>(null);
  const weekdayCounts = useMemo(
    () => new Map(weekdays.map(({ day }) => [day, cells.filter((cell) => cell.day === day).length])),
    []
  );
  const filtered = useMemo(
    () => (selectedDay ? cells.filter((cell) => cell.day === selectedDay) : cells),
    [selectedDay]
  );
  const selectCell = useCallback((cell: Cell) => {
    setSelected(cell);
    if (window.innerWidth < 720) setMenuOpen(false);
  }, []);

  return (
    <main className="app-shell">
      <CellsMap cells={filtered} selected={selected} onSelect={selectCell} />
      <a className="wordmark" href="#top" aria-label="Igreja Recomeçar">
        <img src="/recomecar.jpg" alt="Igreja Recomeçar" />
      </a>
      {!menuOpen && (
        <button className="menu-launch" type="button" onClick={() => setMenuOpen(true)}>
          <Menu size={19} /> Ver células
        </button>
      )}
      <nav className="day-filter" aria-label="Filtrar células por dia da semana">
        <button
          className={!selectedDay ? "is-active" : ""}
          type="button"
          aria-pressed={!selectedDay}
          onClick={() => setSelectedDay(null)}
        >
          <span>Todos</span>
          <small>{cells.length}</small>
        </button>
        {weekdays.map(({ label, day }) => (
          <button
            className={selectedDay === day ? "is-active" : ""}
            key={day}
            type="button"
            aria-label={`${label}: ${weekdayCounts.get(day) ?? 0} células`}
            aria-pressed={selectedDay === day}
            onClick={() => setSelectedDay(day)}
          >
            <span>{label}</span>
            <small>{weekdayCounts.get(day) ?? 0}</small>
          </button>
        ))}
      </nav>
      <CellsSidebar
        activeId={selected?.id}
        open={menuOpen}
        onSelect={selectCell}
        onToggle={() => setMenuOpen(false)}
      />
      <CellDetails cell={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
