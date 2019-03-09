export default function forecast(obj: any) {
  if (!obj.forecast) {
    return [];
  }

  if (!Array.isArray(obj.forecast)) {
    return [obj.forecast];
  }

  return obj.forecast;
}
