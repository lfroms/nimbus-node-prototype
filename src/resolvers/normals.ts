import { convertTemperature } from '../helpers';

export default function normals(obj: any) {
  const { forecastGroup } = obj;

  if (!forecastGroup || !forecastGroup.regionalNormals) {
    return null;
  }

  const {
    regionalNormals: { temperature }
  } = forecastGroup;

  const highTemp = temperature.find(item => item.class === 'high');
  const lowTemp = temperature.find(item => item.class === 'low');

  return {
    high: convertTemperature(highTemp.value, obj.units, true),
    low: convertTemperature(lowTemp.value, obj.units, true)
  };
}
