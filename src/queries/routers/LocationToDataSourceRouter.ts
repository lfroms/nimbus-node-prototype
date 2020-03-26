import { Coordinate } from 'schemas';
import { AppDataSources } from 'index';
import { WeatherDataSource } from 'data_sources/types';

export default class LocationToDataSourceRouter {
  // @ts-ignore Unused for now.
  private requestedLocation: Coordinate;
  private dataSources: AppDataSources;

  constructor(requestedLocation: Coordinate, dataSources: AppDataSources) {
    this.requestedLocation = requestedLocation;
    this.dataSources = dataSources;
  }

  public dataSource(): WeatherDataSource {
    return this.dataSources.environmentCanadaDatamart;
  }
}
