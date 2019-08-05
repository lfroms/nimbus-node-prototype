import { ensureArray } from '../helpers';

export default function winds(obj: any) {
  const { winds } = obj;

  if (!winds) {
    return [];
  }

  const { wind } = winds;

  if (!wind) {
    return [];
  }

  const allWinds = ensureArray(wind);

  return allWinds.map(wind => {
    const { direction, speed, gust, bearing } = wind;

    return {
      direction: direction,
      speed: speed.value,
      gust: gust.value,
      bearing: bearing.value
    };
  });
}
