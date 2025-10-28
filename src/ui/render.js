import { els } from "./dom.js";
import { codeToEmoji, codeToText } from "./icons.js";

export function renderCurrent(placeName, current, units) {
  const now = new Date();
  const fmtDay = new Intl.DateTimeFormat(undefined, {
    weekday: "long", day: "numeric", month: "short", year: "numeric"
  });
  els.locEl.textContent = placeName;
  els.dateEl.textContent = fmtDay.format(now);

  const wcode = current.weather_code;
  els.bigicon.textContent = codeToEmoji[wcode] || "🌡️";
  els.bigtemp.textContent = Math.round(current.temperature_2m) + units.temp;
  els.descEl.textContent = codeToText[wcode] || "Condición desconocida";

  els.feels.textContent = Math.round(current.apparent_temperature) + units.temp;
  els.hum.textContent = Math.round(current.relative_humidity_2m) + "%";
  els.wind.textContent = Math.round(current.wind_speed_10m) + " " + units.wind;
  els.pp.textContent = (current.precipitation ?? 0) + " " + units.pp;

  els.panels.hidden = false;
}

export function renderHours(hourly, units, fromDate = new Date()) {
  els.hours.innerHTML = "";
  const { time, temperature_2m, weather_code, precipitation } = hourly;
  const idxNow = time.findIndex(t => new Date(t) >= fromDate);
  const start = idxNow >= 0 ? idxNow : 0;
  const end = Math.min(start + 12, time.length);

  for (let i = start; i < end; i++) {
    const t = new Date(time[i]);
    const hh = new Intl.DateTimeFormat(undefined, { hour: "numeric" }).format(t);
    const icon = codeToEmoji[weather_code[i]] || "🌡️";
    const row = document.createElement("div");
    row.className = "hour";
    row.innerHTML = `
      <div class="l"><span>${hh}</span><span class="wicon">${icon}</span></div>
      <div class="temp">${Math.round(temperature_2m[i])}${units.temp}</div>
      <div class="pp" title="Precipitación">${(precipitation[i] ?? 0)} ${units.pp}</div>
    `;
    els.hours.appendChild(row);
  }
}

export function renderSuggestions(list, onPick) {
  if (!list.length) { els.suggestions.innerHTML = ""; return; }
  const ul = document.createElement("ul");
  list.forEach(p => {
    const li = document.createElement("li");
    const name = [p.name, p.admin1, p.country].filter(Boolean).join(", ");
    li.textContent = name;
    li.onclick = () => { els.suggestions.innerHTML = ""; onPick({ name, lat: p.latitude, lon: p.longitude }); };
    ul.appendChild(li);
  });
  els.suggestions.innerHTML = "";
  els.suggestions.appendChild(ul);
}
