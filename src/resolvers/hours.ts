import { parseDateTimeAsUNIX } from '../helpers';

export default function hours(obj: any) {
  const { hours } = obj;

  return hours.map(hour => {
    const {
      dateTimeUTC,
      condition,
      iconCode,
      lop,
      temperature,
      humidex,
      windChill,
      wind
    } = hour;

    return {
      time: parseDateTimeAsUNIX(dateTimeUTC),
      summary: condition,
      iconCode: iconCode.value,
      precipProbability: lop.value,
      temperature: temperature.value,
      humidex: humidex ? humidex.value : null,
      windChill: windChill ? windChill.value : null,
      wind
    };
  });
}
