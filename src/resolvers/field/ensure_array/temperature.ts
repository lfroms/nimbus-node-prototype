export default function multipleTemperature(obj: any) {
  if (!obj.temperature) {
    return [];
  }

  if (!Array.isArray(obj.temperature)) {
    return [obj.temperature];
  }

  return obj.temperature;
}
