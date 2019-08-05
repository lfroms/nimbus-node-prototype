export default function station(obj: any) {
  const {
    station: { value, code, lat, lon }
  } = obj;

  return {
    name: value,
    code,
    latitude: lat,
    longitude: lon
  };
}
