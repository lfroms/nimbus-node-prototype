export default function multipleAccumulation(obj: any) {
  if (!obj.accumulation) {
    return [];
  }

  if (!Array.isArray(obj.accumulation)) {
    return [obj.accumulation];
  }

  return obj.accumulation;
}
