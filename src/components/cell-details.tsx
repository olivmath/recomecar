import { CalendarPlus, Clock3, MapPin, Navigation, X } from "lucide-react";
import type { Cell } from "../data/cells";
import { CellIcon } from "./cell-icon";

const weekdayNames = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const weekdayCodes = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const timeZone = "America/Sao_Paulo";

function requiredPart(parts: Intl.DateTimeFormatPart[], type: string) {
  const value = parts.find((part) => part.type === type)?.value;
  if (!value) throw new Error(`Não foi possível determinar o valor de ${type}.`);
  return value;
}

function formatCalendarDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function createCalendarUrl(cell: Cell) {
  if (!cell.day || !cell.time) {
    throw new Error(`Dia ou horário ainda não informado para ${cell.name}.`);
  }
  const weekdayIndex = weekdayNames.indexOf(cell.day);
  const timeMatch = /^(\d{1,2})h(?:(\d{2}))?$/.exec(cell.time);
  if (weekdayIndex === -1 || !timeMatch) {
    throw new Error(`Dia ou horário inválido para ${cell.name}.`);
  }

  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2] ?? 0);
  const now = new Date();
  const nowParts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const todayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    requiredPart(nowParts, "weekday")
  );
  const currentMinutes =
    Number(requiredPart(nowParts, "hour")) * 60 + Number(requiredPart(nowParts, "minute"));
  let daysUntilEvent = (weekdayIndex - todayIndex + 7) % 7;
  if (daysUntilEvent === 0 && hour * 60 + minute <= currentMinutes) daysUntilEvent = 7;

  const year = Number(requiredPart(nowParts, "year"));
  const month = Number(requiredPart(nowParts, "month"));
  const day = Number(requiredPart(nowParts, "day"));
  const eventDate = new Date(Date.UTC(year, month - 1, day + daysUntilEvent, hour, minute));
  const eventParts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(eventDate);
  const eventWallTime = Date.UTC(
    Number(requiredPart(eventParts, "year")),
    Number(requiredPart(eventParts, "month")) - 1,
    Number(requiredPart(eventParts, "day")),
    Number(requiredPart(eventParts, "hour")),
    Number(requiredPart(eventParts, "minute")),
    Number(requiredPart(eventParts, "second"))
  );
  const start = new Date(eventDate.getTime() - (eventWallTime - eventDate.getTime()));
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const startStamp = formatCalendarDate(start);
  const endStamp = formatCalendarDate(end);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: cell.name,
    dates: `${startStamp}/${endStamp}`,
    details: `${cell.description}\nEncontro semanal: ${cell.day}, ${cell.time}`,
    location: cell.address,
    recur: `RRULE:FREQ=WEEKLY;BYDAY=${weekdayCodes[weekdayIndex]}`,
    ctz: timeZone,
    rem: "30",
  });

  return `https://calendar.google.com/calendar/render?${params}`;
}

function WhatsAppIcon({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
}

export function CellDetails({ cell, onClose }: { cell: Cell | null; onClose: () => void }) {
  if (!cell) return null;
  const calendarUrl = cell.day && cell.time ? createCalendarUrl(cell) : undefined;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cell.coordinates.join(","))}`;
  const message = encodeURIComponent(`Oi! Quero conhecer a ${cell.name}.`);
  const whatsappUrl = cell.whatsapp ? `https://wa.me/${cell.whatsapp}?text=${message}` : `https://api.whatsapp.com/send?text=${message}`;
  return <aside className="details" aria-label={`Detalhes da ${cell.name}`}>
    <div className="details-photo">{cell.image && <img src={cell.image} alt="" />}<button type="button" onClick={onClose} aria-label="Fechar detalhes"><X size={20} /></button></div>
    <div className="details-body">
      <header className="details-header">
        <div className="cell-kicker"><CellIcon icon={cell.icon} color={cell.color} size={14} /> Célula</div>
        <h2>{cell.name}</h2>
        <p className="details-desc">{cell.description}</p>
      </header>
      <dl className="details-meta">
        <div><dt><Clock3 size={14} /> Quando</dt><dd>{cell.day && cell.time ? `${cell.day}, ${cell.time}` : "Dia e horário a confirmar"}</dd></div>
        <div><dt><MapPin size={14} /> Onde</dt><dd>{cell.address}</dd></div>
      </dl>
      <nav className="details-actions" aria-label="Ações da célula">
        <a className="action whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /><span>WhatsApp<small>Falar com a célula</small></span></a>
        <a className="action directions" href={mapsUrl} target="_blank" rel="noreferrer"><Navigation size={18} /><span>Como chegar<small>Abrir no Maps</small></span></a>
        {calendarUrl && <a className="action calendar-action" href={calendarUrl} target="_blank" rel="noreferrer"><CalendarPlus size={18} /><span>Adicionar lembrete<small>Evento semanal com alerta</small></span></a>}
      </nav>
    </div>
  </aside>;
}
