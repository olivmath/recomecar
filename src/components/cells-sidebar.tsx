import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cells } from "../data/cells";
import { CellIcon } from "./cell-icon";

type Props = {
  activeId?: string;
  open: boolean;
  onSelect: (cell: (typeof cells)[number]) => void;
  onToggle: () => void;
};

export function CellsSidebar({ activeId, open, onSelect, onToggle }: Props) {
  const [query, setQuery] = useState("");
  const visibleCells = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return normalized
      ? cells.filter((cell) =>
          `${cell.name} ${cell.day ?? ""} ${cell.time ?? ""} ${cell.address}`
            .toLocaleLowerCase("pt-BR")
            .includes(normalized)
        )
      : cells;
  }, [query]);

  return (
    <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Lista de células">
      <button
        className="sidebar-toggle"
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-label="Fechar menu"
      >
        <X size={20} />
        <span>Fechar</span>
      </button>
      <div className="sidebar-content">
        <div className="brand">
          <p>Igreja Recomeçar</p>
          <h1>Encontre uma célula</h1>
          <span>Um lugar para pertencer.</span>
        </div>
        <label className="search">
          <Search size={17} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome ou dia"
            aria-label="Buscar célula"
          />
        </label>
        <div className="cell-list">
          {visibleCells.map((cell) => (
            <button
              key={cell.id}
              className={`cell-item ${activeId === cell.id ? "is-active" : ""}`}
              type="button"
              onClick={() => onSelect(cell)}
            >
              <span className="cell-symbol">
                <CellIcon icon={cell.icon} color={cell.color} />
              </span>
              <span>
                <strong>{cell.name}</strong>
                <small>
                  {cell.day && cell.time
                    ? `${cell.day}, ${cell.time}`
                    : "Dia e horário a confirmar"}
                </small>
              </span>
            </button>
          ))}
        </div>
        {!visibleCells.length && <p className="empty">Nenhuma célula encontrada.</p>}
      </div>
    </aside>
  );
}
