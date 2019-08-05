import { ensureArray, convertTemperature } from '../helpers';

interface TodaySummary {
  high: string | null;
  low: string | null;
}

const NULL_OBJECT: TodaySummary = {
  high: null,
  low: null
};

export default function todaySummary(obj: any): TodaySummary {
  const { forecastGroup } = obj;

  if (!forecastGroup) {
    return NULL_OBJECT;
  }

  const { forecast } = forecastGroup;

  if (!forecast) {
    return NULL_OBJECT;
  }

  const today = forecast.find(
    item => item.period.textForecastName.toLowerCase() === 'today'
  );

  const tonight = forecast.find(
    item => item.period.textForecastName.toLowerCase() === 'tonight'
  );

  return {
    high: getOptionalTemperature(today, obj),
    low: getOptionalTemperature(tonight, obj)
  };
}

function getOptionalTemperature(day: any, obj: any) {
  if (!day) {
    return null;
  }

  const {
    temperatures: { temperature }
  } = day;

  const asArray = ensureArray(temperature);

  if (!asArray) {
    return null;
  }

  return convertTemperature(asArray[0].value, obj.units, true);
}
