export default function hourlyForecast(obj: any) {
  const { hourlyForecastGroup } = obj;

  if (!hourlyForecastGroup) {
    return null;
  }

  const { dateTime, hourlyForecast } = hourlyForecastGroup;

  return {
    time: dateTime,
    hours: hourlyForecast
  };
}
