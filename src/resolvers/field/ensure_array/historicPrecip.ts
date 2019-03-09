export default function multipleHistoricPrecip(obj: any) {
  if (!obj.precip) {
    return [];
  }

  if (!Array.isArray(obj.precip)) {
    return [obj.precip];
  }

  return obj.precip;
}
