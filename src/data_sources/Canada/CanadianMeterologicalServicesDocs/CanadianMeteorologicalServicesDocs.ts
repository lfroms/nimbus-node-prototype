import { RESTDataSource } from 'apollo-datasource-rest';
import { GeoJSONResponse, Site } from './types';
import { findClosestSite } from './helpers';
import Axios, { AxiosRequestConfig } from 'axios';

export default class CanadianMeteorologicalServicesDocs extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://collaboration.cmc.ec.gc.ca/cmc/cmos/public_doc';
  }

  public async getNearestSite(latitude: number, longitude: number, rank: number): Promise<Site> {
    const sites = await this.getSites();

    return findClosestSite(latitude, longitude, sites, rank);
  }

  private async getSites(): Promise<Site[]> {
    const options: AxiosRequestConfig = {
      baseURL: this.baseURL
    };

    try {
      const response = await Axios.get('/msc-data/citypage-weather/site_list_en.geojson', options);
      return this.mapGeoJSONDataToSite(response.data);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  private mapGeoJSONDataToSite(geoJSONData: GeoJSONResponse): Site[] {
    return geoJSONData.features.map(feature => ({
      code: this.convertCodeStringToInt(feature.properties.Codes),
      name: feature.properties['English Names'],
      province: feature.properties['Province Codes'],
      latitude: feature.properties.Latitude,
      longitude: feature.properties.Longitude
    }));
  }

  private convertCodeStringToInt(code: string): number {
    return parseInt(code.trim().substr(1));
  }
}
