import { RESTDataSource } from 'apollo-datasource-rest';
import Axios, { AxiosRequestConfig } from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';
import { Language } from '../../../schema';

import { CanadianMeteorologicalServicesDocs } from '../CanadianMeterologicalServicesDocs';
import { convertCharacterEncoding } from '../helpers';
import { CitypageWeatherURL, CitypageWeatherFilename } from '.';
import { WeatherDataSource, WeatherDataSourceResponse } from 'data_sources/types';

export default class EnvironmentCanadaDatamart extends RESTDataSource implements WeatherDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dd.weather.gc.ca/citypage_weather';
  }

  private axiosClient = Axios.create({
    baseURL: this.baseURL,
    headers: { 'Cache-Control': 'no-cache' },
    adapter: throttleAdapterEnhancer(Axios.defaults.adapter!, { threshold: 120_000 }) // 2 minutes
  });

  public async getWeather(
    latitude: number,
    longitude: number,
    nearestSiteRank: number,
    meteorologicalServicesDocs: CanadianMeteorologicalServicesDocs
  ): Promise<WeatherDataSourceResponse> {
    const nearestSites = await meteorologicalServicesDocs.getTopTwoNearestSites(
      nearestSiteRank,
      latitude,
      longitude
    );

    const filename = new CitypageWeatherFilename(nearestSites[0].code, Language.english);
    const url = new CitypageWeatherURL(nearestSites[0].province, filename);

    const options: AxiosRequestConfig = {
      url: '/xml/' + url.toString(),
      baseURL: this.baseURL,
      responseType: 'arraybuffer'
    };

    const response = await this.axiosClient.request(options);
    const decoded = convertCharacterEncoding(response.data);

    return {
      dataString: decoded,
      actualCoordinate: {
        latitude: nearestSites[0].latitude,
        longitude: nearestSites[0].longitude
      },
      nextNearestSiteDistance: nearestSites[1].distanceFromRequestedCoordinate
    };
  }
}
