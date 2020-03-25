export default interface Site {
  code: number;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  distanceFromRequestedCoordinate?: number;
}
