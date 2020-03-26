import { RESTDataSource } from 'apollo-datasource-rest';
import { WeatherDataSourceResponse } from '.';

export default interface WeatherDataSource {
  getWeather(
    latitude: number,
    longitude: number,
    nearestSiteIndex: number,
    documentationSource?: RESTDataSource
  ): Promise<WeatherDataSourceResponse>;
}
