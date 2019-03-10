import { RESTDataSource } from 'apollo-datasource-rest';

export type Language = 'e' | 'f';

export default class EnvironmentCanadaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://dd.weather.gc.ca/citypage_weather/xml/';
  }

  async getWeather(region: string, siteCode: number, language: Language) {
    const paddedSiteCode: String = siteCode.toString().padStart(7, '0');
    const filename = `s${paddedSiteCode}_${language}`;

    return this.get(`${region}/${filename}.xml`);
  }

  async getSites() {
    return this.get('siteList.xml');
  }
}
