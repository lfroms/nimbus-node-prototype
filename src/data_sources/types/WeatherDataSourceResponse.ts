import { Coordinate } from 'schemas';

export default interface WeatherDataSourceResponse {
  dataString: string;
  actualCoordinate: Coordinate;
  nextNearestSiteDistance: number;
}
