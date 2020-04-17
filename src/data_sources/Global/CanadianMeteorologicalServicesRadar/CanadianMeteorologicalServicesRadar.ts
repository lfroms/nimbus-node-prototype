import { RESTDataSource } from 'apollo-datasource-rest';
import { RadarTimestampDataSource } from 'data_sources/types';

export default class CanadianMeteorologicalServicesRadar extends RESTDataSource
  implements RadarTimestampDataSource {
  constructor() {
    super();
    this.baseURL = 'https://geo.weather.gc.ca/';
  }

  public async getData(): Promise<string> {
    return await this.get(
      'geomet',
      {
        lang: 'en',
        service: 'WMS',
        request: 'GetCapabilities',
        version: '1.3.0',
        layers: 'RADAR_1KM_RRAI',
      },
      {
        cache: 'no-cache',
      }
    );
  }
}
