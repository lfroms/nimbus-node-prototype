export default function yesterdayHigh(obj: any) {
  const { temperature } = obj;

  if (!temperature) {
    return null;
  }

  const high = temperature.find(temp => temp.class === 'high');

  if (!high) {
    return null;
  }

  return high.value;
}
