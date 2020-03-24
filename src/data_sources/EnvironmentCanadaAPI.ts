import { RESTDataSource } from 'apollo-datasource-rest';
import request, { RequestPromiseOptions } from 'request-promise-native';
import csvtojson = require('csvtojson');

export type Language = 'e' | 'f';

export default class EnvironmentCanadaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://dd.weather.gc.ca/citypage_weather/';
  }

  async getWeather(region: string, siteCode: number, language: Language): Promise<Buffer> {
    const paddedSiteCode: String = siteCode.toString().padStart(7, '0');
    const filename = `s${paddedSiteCode}_${language}`;

    const options: RequestPromiseOptions = {
      baseUrl: this.baseURL,
      encoding: null
    };

    return request(`xml/${region}/${filename}.xml`, options);
  }

  async getSites(language: Language) {
    const options: RequestPromiseOptions = {
      baseUrl: this.baseURL
    };

    const languageAbbr = language === 'f' ? 'fr' : 'en';
    const csvData = await request(`docs/site_list_${languageAbbr}.csv`, options);

    return csvtojson({
      noheader: false,
      headers: ['code', 'name', 'province', 'latitude', 'longitude']
    }).fromString(csvData);
  }
}
