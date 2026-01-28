// js/calendar.js

// Helpers para datas
window.CalendarHelpers = {
  toISODate(d){
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,"0");
    const day = String(d.getDate()).padStart(2,"0");
    return `${y}-${m}-${day}`;
  },
  fromISO(iso){
    const [y,m,d] = iso.split("-").map(Number);
    return new Date(y, m-1, d);
  }
};

// Gera todos os dias do ano atual
(function generateAllDaysOfYear(){
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  const out = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
    out.push(window.CalendarHelpers.toISODate(d));
  }

  window.AVAILABLE_DATES = out;
})();
