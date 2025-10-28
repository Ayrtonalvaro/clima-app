export function unitLabels(mode) {
  return mode === "imperial"
    ? { temp: "°F", wind: "mph", pp: "inch" }
    : { temp: "°C", wind: "km/h", pp: "mm" };
}

export function apiUnitParams(mode) {
  return mode === "imperial"
    ? "temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch"
    : "temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm";
}