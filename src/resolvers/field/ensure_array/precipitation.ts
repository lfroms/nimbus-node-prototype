export default function multipleHistoricPrecip(obj: any) {
  if (!obj.precipitation) {
    return [];
  }

  if (!Array.isArray(obj.precipitation)) {
    return [obj.precipitation];
  }

  return obj.precipitation;
}
