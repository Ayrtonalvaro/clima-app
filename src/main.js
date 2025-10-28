import { searchPlaces } from "./api/geocoding.js";
import { fetchWeather } from "./api/weather.js";
import { unitLabels, apiUnitParams } from "./services/units.js";
import { state } from "./services/state.js";
import { els } from "./ui/dom.js";
import { renderCurrent, renderHours, renderSuggestions } from "./ui/render.js";
import { debounce } from "./utils/debounce.js";

async function loadWeatherFor(place) {
  state.lastPlace = place;
  const unitParams = apiUnitParams(state.unitMode);
  const data = await fetchWeather({ lat: place.lat, lon: place.lon, unitParams });
  const units = unitLabels(state.unitMode);

  renderCurrent(place.name, data.current, units);
  renderHours(data.hourly, units, new Date());
}


els.q.addEventListener("input", debounce(async (e) => {
  const text = e.target.value.trim();
  if (text.length < 2) { els.suggestions.innerHTML = ""; return; }
  const results = await searchPlaces(text, 5);
  renderSuggestions(results, loadWeatherFor);
}, 250));

els.btn.addEventListener("click", async () => {
  const text = els.q.value.trim();
  if (!text) return;
  const results = await searchPlaces(text, 5);
  renderSuggestions(results, loadWeatherFor);
});

els.q.addEventListener("keydown", (e) => {
  if (e.key === "Enter") els.btn.click();
});


els.unitsBar.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-u]");
  if (!btn) return;
  state.unitMode = btn.dataset.u;
  [...els.unitsBar.querySelectorAll("button")].forEach(b => {
    const active = b.dataset.u === state.unitMode;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", String(active));
  });
  if (state.lastPlace) loadWeatherFor(state.lastPlace);
});


window.addEventListener("load", () => {
  const buenosAires = { 
    name: "Buenos Aires, Argentina", 
    lat: -34.61, 
    lon: -58.38 
  };
  loadWeatherFor(buenosAires);
});