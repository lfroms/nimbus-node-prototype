export default function dailyForecast(obj: any) {
  const { forecastGroup } = obj;

  if (!forecastGroup) {
    return null;
  }

  const { dateTime, forecast, textSummary } = forecastGroup;

  return {
    time: dateTime,
    days: forecast,
    summary: textSummary
  };
}
