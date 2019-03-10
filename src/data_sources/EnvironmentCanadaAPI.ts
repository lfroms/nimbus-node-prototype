import { RESTDataSource } from 'apollo-datasource-rest';
import request, { RequestPromiseOptions } from 'request-promise-native';

export type Language = 'e' | 'f';

export default class EnvironmentCanadaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://dd.weather.gc.ca/citypage_weather/xml/';
  }

  async getWeather(
    region: string,
    siteCode: number,
    language: Language
  ): Promise<Buffer> {
    const paddedSiteCode: String = siteCode.toString().padStart(7, '0');
    const filename = `s${paddedSiteCode}_${language}`;

    const options: RequestPromiseOptions = {
      baseUrl: this.baseURL,
      encoding: null
    };

    return request(`${region}/${filename}.xml`, options);
  }

  async getSites(): Promise<Buffer> {
    const options: RequestPromiseOptions = {
      baseUrl: this.baseURL,
      encoding: null
    };

    return request('siteList.xml', options);
  }
}
