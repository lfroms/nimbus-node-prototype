import { RESTDataSource } from 'apollo-datasource-rest';

export default interface WeatherDataSource {
  getWeather(
    latitude: number,
    longitude: number,
    documentationSource?: RESTDataSource
  ): Promise<any>;
}
