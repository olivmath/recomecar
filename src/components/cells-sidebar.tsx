import { Search, X } from "lucide-react";
import type { Cell } from "../data/cells";
import { CellIcon } from "./cell-icon";

type Props = { cells: Cell[]; activeId?: string; open: boolean; query: string; onQueryChange: (value: string) => void; onSelect: (cell: Cell) => void; onToggle: () => void };

export function CellsSidebar({ cells, activeId, open, query, onQueryChange, onSelect, onToggle }: Props) {
  return <aside className={`sidebar ${open ? "is-open" : ""}`} aria-label="Lista de células">
    <button className="sidebar-toggle" type="button" onClick={onToggle} aria-expanded={open} aria-label="Fechar menu">
      <X size={20} /><span>Fechar</span>
    </button>
    <div className="sidebar-content">
      <div className="brand"><p>Igreja Recomeçar</p><h1>Encontre uma célula</h1><span>Um lugar para pertencer.</span></div>
      <label className="search"><Search size={17} /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Buscar por nome ou dia" aria-label="Buscar célula" /></label>
      <div className="cell-list">{cells.map((cell) => <button key={cell.id} className={`cell-item ${activeId === cell.id ? "is-active" : ""}`} type="button" onClick={() => onSelect(cell)}>
        <span className="cell-symbol"><CellIcon icon={cell.icon} color={cell.color} /></span><span><strong>{cell.name}</strong><small>{cell.day}, {cell.time}</small></span>
      </button>)}</div>
      {!cells.length && <p className="empty">Nenhuma célula encontrada.</p>}
    </div>
  </aside>;
}
