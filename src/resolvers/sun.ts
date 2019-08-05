import { parseDateTimeAsUNIX } from '../helpers';

export default function sun(obj: any) {
  const { riseSet } = obj;

  if (!riseSet || !riseSet.dateTime) {
    return null;
  }

  const { dateTime } = riseSet;
  const utcValues = dateTime.filter(item => item.zone === 'UTC');

  const sunrise = utcValues.find(item => item.name === 'sunrise');
  const sunset = utcValues.find(item => item.name === 'sunset');

  if (!sunrise || !sunset) {
    return null;
  }

  return {
    riseTime: parseDateTimeAsUNIX(sunrise.timeStamp),
    setTime: parseDateTimeAsUNIX(sunset.timeStamp)
  };
}
