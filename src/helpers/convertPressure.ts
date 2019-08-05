import { unit, round } from 'mathjs';
import { ImperialMetric } from './types';

export default function convertPressure(
  pressure: string,
  units: ImperialMetric
) {
  if (!pressure) {
    return pressure;
  }

  if (units === 'metric') {
    return pressure;
  }

  const kPa = unit(`${pressure} kPa`);
  const millimetres = kPa.toNumber('mmHg');
  const inches = unit(millimetres, 'mm').toNumber('inch');

  return round(inches, 1);
}
