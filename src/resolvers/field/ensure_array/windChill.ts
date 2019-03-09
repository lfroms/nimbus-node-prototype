export default function multipleWindChill(obj: any) {
  if (!obj.calculated) {
    return [];
  }

  if (!Array.isArray(obj.calculated)) {
    return [obj.calculated];
  }

  return obj.calculated;
}
