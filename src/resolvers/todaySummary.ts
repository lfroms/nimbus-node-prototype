import { ensureArray } from '../helpers';

interface TodaySummary {
  high: number | null;
  low: number | null;
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
    high: getOptionalTemperature(today),
    low: getOptionalTemperature(tonight)
  };
}

function getOptionalTemperature(day: any) {
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

  return asArray[0].value;
}
