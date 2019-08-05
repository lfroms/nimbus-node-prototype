import { convertTemperature } from '../../helpers';

export default function yesterdayLow(obj: any) {
  const { temperature } = obj;

  if (!temperature) {
    return null;
  }

  const low = temperature.find(temp => temp.class === 'low');

  if (!low) {
    return null;
  }

  return convertTemperature(low.value, obj.units);
}
