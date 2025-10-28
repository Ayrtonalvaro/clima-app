const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchPlaces(query, count = 5) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=${count}&language=es&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error de geocodificación");
  const data = await res.json();
  return data.results ?? [];
}
