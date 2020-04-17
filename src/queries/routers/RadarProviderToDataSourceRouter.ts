import { RadarProvider, RadarTimestamps } from '../../schemas';
import { AppDataSources } from 'index';
import { RadarTimestampDataSource } from 'data_sources/types';
import {
  Translator,
  CanadianMeteorologicalServicesRadarTranslator,
  RainviewerTranslator,
} from '../translators';

export default class RadarProviderToDataSourceRouter {
  private provider: RadarProvider;
  private dataSources: AppDataSources;

  constructor(provider: RadarProvider, dataSources: AppDataSources) {
    this.provider = provider;
    this.dataSources = dataSources;
  }

  public async getTimestamps(): Promise<RadarTimestamps> {
    const data = await this.dataSource().getData();
    const translator = this.translator(data);

    return translator.translate();
  }

  private dataSource(): RadarTimestampDataSource {
    switch (this.provider) {
      case RadarProvider.msc:
        return this.dataSources.canadianMeteorologicalServicesRadar;
      case RadarProvider.rainviewer:
        return this.dataSources.rainviewer;
    }
  }

  private translator(dataString: string): Translator<RadarTimestamps> {
    switch (this.provider) {
      case RadarProvider.msc:
        return new CanadianMeteorologicalServicesRadarTranslator(dataString);
      case RadarProvider.rainviewer:
        return new RainviewerTranslator(dataString);
    }
  }
}
