import {
  convertTemperature,
  convertPressure,
  convertDistance
} from '../helpers';

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

  const windChillConverted = windChill
    ? convertTemperature(windChill.value, obj.units, true)
    : null;

  const humidexConverted = humidex
    ? convertTemperature(humidex.value, obj.units, true)
    : null;

  return {
    time: dateTime,
    station,
    temperature: convertTemperature(temperature.value, obj.units),
    humidity: relativeHumidity.value,
    pressure: convertPressure(pressure.value, obj.units),
    windChill: windChillConverted,
    humidex: humidexConverted,
    wind,
    visibility: convertDistance(visibility.value, obj.units, true),
    dewPoint: convertTemperature(dewpoint.value, obj.units),
    iconCode: iconCode.value,
    summary: condition
  };
}
