import { Coordinate, Weather } from 'schemas';
import { AppDataSources } from 'index';
import { WeatherDataSource } from 'data_sources/types';
import { RESTDataSource } from 'apollo-datasource-rest';
import { Translator, EnvironmentCanadaTranslator } from '../translators';

enum RegionalDataSource {
  EnvironmentCanada = 'env_can'
}

interface FetchedWeatherResponse {
  weather: Weather;
  nextNearestSiteDistance: number;
}

export default class LocationToDataSourceRouter {
  // @ts-ignore Unused for now.
  private requestedLocation: Coordinate;
  private regionalDataSource: RegionalDataSource;
  private dataSources: AppDataSources;

  constructor(requestedLocation: Coordinate, dataSources: AppDataSources) {
    this.requestedLocation = requestedLocation;
    this.dataSources = dataSources;

    // Only currently available location.
    this.regionalDataSource = RegionalDataSource.EnvironmentCanada;
  }

  public async getWeather(): Promise<Weather> {
    const response = await this.fetchWeatherWithSiteIndex(0);
    const canUseNextWeatherStation = response.nextNearestSiteDistance <= 20_000; // 20km

    if (!this.hasSufficientWeatherData(response.weather) && canUseNextWeatherStation) {
      const nextResponse = await this.fetchWeatherWithSiteIndex(1);

      if (this.hasSufficientWeatherData(nextResponse.weather)) {
        return nextResponse.weather;
      }

      return response.weather;
    }

    return response.weather;
  }

  private hasSufficientWeatherData(weather: Weather): boolean {
    return !!weather.currently.icon || false;
  }

  private async fetchWeatherWithSiteIndex(index: number): Promise<FetchedWeatherResponse> {
    const response = await this.dataSource().getWeather(
      this.requestedLocation.latitude,
      this.requestedLocation.longitude,
      index,
      this.documentationSource()
    );

    return {
      weather: this.translator(
        response.dataString,
        this.requestedLocation,
        response.actualCoordinate
      ).translate(),
      nextNearestSiteDistance: response.nextNearestSiteDistance
    };
  }

  private dataSource(): WeatherDataSource {
    switch (this.regionalDataSource) {
      case RegionalDataSource.EnvironmentCanada:
        return this.dataSources.environmentCanadaDatamart;
    }
  }

  private documentationSource(): RESTDataSource {
    switch (this.regionalDataSource) {
      case RegionalDataSource.EnvironmentCanada:
        return this.dataSources.canadianMeteorologicalServicesDocs;
    }
  }

  private translator(
    dataString: string,
    requestedCoordinate: Coordinate,
    actualCoordinate: Coordinate
  ): Translator<Weather> {
    switch (this.regionalDataSource) {
      case RegionalDataSource.EnvironmentCanada:
        return new EnvironmentCanadaTranslator(dataString, requestedCoordinate, actualCoordinate);
    }
  }
}
