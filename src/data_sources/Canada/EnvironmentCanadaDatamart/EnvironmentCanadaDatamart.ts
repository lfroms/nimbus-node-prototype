import { RESTDataSource } from 'apollo-datasource-rest';
import Axios, { AxiosRequestConfig } from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';

import { CitypageWeatherURL, CitypageWeatherFilename } from '.';
import { CanadianMeteorologicalServicesDocs } from '../CanadianMeterologicalServicesDocs';
import { convertCharacterEncoding } from '../helpers';
import { Language } from '../../../schema';

export default class EnvironmentCanadaDatamart extends RESTDataSource {
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
  ): Promise<string> {
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

    return decoded;
  }
}
