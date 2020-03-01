import { ensureArray } from '../helpers';

export default function days(obj: any) {
  const { days } = obj;

  if (!days) {
    return null;
  }

  return days.map(day => {
    const {
      period,
      textSummary,
      abbreviatedForecast,
      cloudPrecip,
      temperatures,
      humidex,
      windChill,
      winds,
      uv
    } = day;

    const {
      textSummary: shortTextSummary,
      iconCode,
      pop
    } = abbreviatedForecast;

    const { textSummary: cloudPrecipSummary } = cloudPrecip;

    return {
      when: period.textForecastName,
      longSummary: textSummary,
      summary: cloudPrecipSummary,
      shortSummary: shortTextSummary,
      iconCode: iconCode.value,
      precipProbability: pop.value,
      temperature: ensureArray(temperatures.temperature)[0].value,
      humidex: humidex ? humidex.calculated.value : null,
      windChill: windChill ? windChill.calculated.value : null,
      winds,
      uv
    };
  });
}
