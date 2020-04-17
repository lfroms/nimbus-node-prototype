import { RESTDataSource } from 'apollo-datasource-rest';
import { RadarTimestampDataSource } from 'data_sources/types';

export default class Rainviewer extends RESTDataSource implements RadarTimestampDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.rainviewer.com';
  }

  public async getData(): Promise<string> {
    this.memoizedResults.clear();

    const data = await this.get(
      'public/maps.json',
      {},
      {
        cacheOptions: {
          ttl: 0,
        },
        cache: 'no-cache',
      }
    );

    return JSON.stringify(data);
  }
}
