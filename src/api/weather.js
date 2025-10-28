const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeather({ lat, lon, unitParams }) {
  const base = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&timezone=auto&${unitParams}`;
  const params = [
    "current=temperature_2m,apparent_temperature,precipitation,relative_humidity_2m,weather_code,wind_speed_10m",
    "hourly=temperature_2m,weather_code,precipitation,wind_speed_10m"
  ].join("&");
  const res = await fetch(`${base}&${params}`);
  if (!res.ok) throw new Error("Error al obtener el pronóstico");
  return res.json();
}
