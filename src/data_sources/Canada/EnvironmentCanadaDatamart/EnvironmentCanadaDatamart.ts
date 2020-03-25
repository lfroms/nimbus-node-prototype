import { RESTDataSource } from 'apollo-datasource-rest';
import { CitypageWeatherURL, CitypageWeatherFilename } from '.';
import { Language } from '../../../schema';
import Axios, { AxiosRequestConfig } from 'axios';
import { CanadianMeteorologicalServicesDocs } from '../CanadianMeterologicalServicesDocs';
import { convertCharacterEncoding } from '../helpers';

export default class EnvironmentCanadaDatamart extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://dd.weather.gc.ca/citypage_weather';
  }

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

    const response = await Axios.request(options);
    const decoded = convertCharacterEncoding(response.data);

    return decoded;
  }
}
