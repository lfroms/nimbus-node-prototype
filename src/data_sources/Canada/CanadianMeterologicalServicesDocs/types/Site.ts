export default interface Site {
  code: string;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
}

export interface SiteWithDistance extends Site {
  distanceFromRequestedCoordinate: number;
}
