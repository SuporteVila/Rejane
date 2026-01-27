// js/calendar.js
// Edite aqui os dias disponíveis no formato YYYY-MM-DD
window.AVAILABLE_DATES = [
  "2026-01-28",
  "2026-01-30",
  "2026-02-03",
  "2026-02-05",
  "2026-02-12",
  "2026-02-18",
  "2026-02-25"
];

window.CalendarHelpers = {
  toISODate(d){
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  },
  fromISO(iso){
    const [y,m,d] = iso.split("-").map(Number);
    return new Date(y, m-1, d);
  }
};
