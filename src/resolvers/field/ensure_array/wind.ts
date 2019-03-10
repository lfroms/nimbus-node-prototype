export default function wind(obj: any) {
  if (!obj.wind) {
    return [];
  }

  if (!Array.isArray(obj.wind)) {
    return [obj.wind];
  }

  return obj.wind;
}
