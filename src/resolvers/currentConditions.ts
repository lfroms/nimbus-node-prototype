export default function currentConditions(obj: any) {
  const { currentConditions } = obj;

  if (!currentConditions) {
    return null;
  }

  const {
    dateTime,
    station,
    temperature,
    relativeHumidity,
    pressure,
    windChill,
    humidex,
    visibility,
    dewpoint,
    iconCode,
    condition,
    wind
  } = currentConditions;

  return {
    time: dateTime,
    station,
    temperature: temperature.value,
    humidity: relativeHumidity.value,
    pressure: pressure.value,
    windChill: windChill ? windChill.value : null,
    humidex: humidex ? humidex.value : null,
    wind,
    visibility: visibility.value,
    dewPoint: dewpoint.value,
    iconCode: iconCode.value,
    summary: condition
  };
}
