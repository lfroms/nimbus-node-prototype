import { RESTDataSource } from 'apollo-datasource-rest';
import Axios, { AxiosRequestConfig } from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';
import { Coordinate } from 'schemas';
import { Language } from '../../../schema';

import { CanadianMeteorologicalServicesDocs } from '../CanadianMeterologicalServicesDocs';
import { convertCharacterEncoding } from '../helpers';
import { CitypageWeatherURL, CitypageWeatherFilename } from '.';
import { WeatherDataSource } from 'data_sources/types';

interface EnvironmentCanadaDatamartResponse {
  dataString: string;
  actualCoordinate: Coordinate;
}

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
    meteorologicalServicesDocs: CanadianMeteorologicalServicesDocs
  ): Promise<EnvironmentCanadaDatamartResponse> {
    const nearestSite = await meteorologicalServicesDocs.getNearestSite(latitude, longitude, 1);

    const filename = new CitypageWeatherFilename(nearestSite.code, Language.english);
    const url = new CitypageWeatherURL(nearestSite.province, filename);

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
        latitude: nearestSite.latitude,
        longitude: nearestSite.longitude
      }
    };
  }
}
