export default function temperature(obj: any) {
  if (!obj.temperature) {
    return [];
  }

  if (!Array.isArray(obj.temperature)) {
    return [obj.temperature];
  }

  return obj.temperature;
}
