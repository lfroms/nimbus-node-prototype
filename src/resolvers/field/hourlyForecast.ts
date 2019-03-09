export default function hourlyForecast(obj: any) {
  if (!obj.hourlyForecast) {
    return [];
  }

  if (!Array.isArray(obj.hourlyForecast)) {
    return [obj.hourlyForecast];
  }

  return obj.hourlyForecast;
}
