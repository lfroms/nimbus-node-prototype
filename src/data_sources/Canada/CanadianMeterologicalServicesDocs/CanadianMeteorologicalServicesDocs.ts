import { RESTDataSource } from 'apollo-datasource-rest';
import { GeoJSONResponse, Site, SiteWithDistance } from './types';
import { findClosestSite } from './helpers';

export default class CanadianMeteorologicalServicesDocs extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://collaboration.cmc.ec.gc.ca/cmc/cmos/public_doc/';
  }

  public async getTopTwoNearestSites(
    startingAtIndex: number,
    latitude: number,
    longitude: number
  ): Promise<SiteWithDistance[]> {
    const sites = await this.getSites();

    return [startingAtIndex, startingAtIndex + 1].map(rank =>
      findClosestSite(latitude, longitude, sites, rank)
    );
  }

  private async getSites(): Promise<Site[]> {
    try {
      const response = await this.get('msc-data/citypage-weather/site_list_en.geojson');
      const jsonResponse = JSON.parse(response);

      return this.mapGeoJSONDataToSite(jsonResponse);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  private mapGeoJSONDataToSite(geoJSONData: GeoJSONResponse): Site[] {
    return geoJSONData.features.map<Site>(feature => ({
      code: feature.properties.Codes,
      name: feature.properties['English Names'],
      province: feature.properties['Province Codes'],
      latitude: feature.properties.Latitude,
      longitude: feature.properties.Longitude
    }));
  }
}
