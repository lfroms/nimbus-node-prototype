import { RESTDataSource } from 'apollo-datasource-rest';
import { RadarTimestampDataSource } from 'data_sources/types';

export default class CanadianMeteorologicalServicesRadar extends RESTDataSource
  implements RadarTimestampDataSource {
  constructor() {
    super();
    this.baseURL = 'https://geo.weather.gc.ca/';
  }

  public async getData(): Promise<string> {
    this.memoizedResults.clear();

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
        cacheOptions: {
          ttl: 0,
        },
        cache: 'no-cache',
      }
    );
  }
}
