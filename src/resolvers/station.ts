import geolib from 'geolib';

export default function station(obj: any) {
  const {
    station: { value, code, lat, lon },
    requestedCoordinate,
    nearestCoordinate
  } = obj;

  const distance = geolib.getDistance(requestedCoordinate, nearestCoordinate);

  return {
    name: value,
    code,
    latitude: lat,
    longitude: lon,
    distanceMetres: distance
  };
}
