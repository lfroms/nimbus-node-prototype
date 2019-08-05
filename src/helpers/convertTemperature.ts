import { unit, round } from 'mathjs';
import { ImperialMetric } from './types';

export default function convertTemperature(
  temperature: string,
  units: ImperialMetric,
  shouldRound: boolean = false
) {
  if (!temperature) {
    return temperature;
  }

  if (units === 'metric') {
    return temperature;
  }

  const celcius = unit(`${temperature} degC`);
  const fahrenheit = celcius.toNumber('degF');

  return round(fahrenheit, shouldRound ? 0 : 1).toString();
}
