import { unit, round } from 'mathjs';
import { ImperialMetric } from './types';

export default function convertDistance(
  distance: string,
  units: ImperialMetric,
  shouldRound: boolean = false
) {
  if (!distance) {
    return distance;
  }

  if (units === 'metric') {
    return distance;
  }

  const miles = unit(`${distance} km`).toNumber('mi');

  return round(miles, shouldRound ? 0 : 1).toString();
}
