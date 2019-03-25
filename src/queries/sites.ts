import { Context } from 'apollo-server-core';
import geolib from 'geolib';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface SiteListArgs {
  language: Language;
  latitude?: number;
  longitude?: number;
  limit?: number;
}

interface Site {
  code: string;
  name: string;
  province: string;
  latitude: string;
  longitude: string;
}

export default async function sites(
  _obj: any,
  args: SiteListArgs,
  context: Context<any>
) {
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;
  const { language, limit, latitude, longitude } = args;

  const data = await (api as EnvironmentCanadaAPI).getSites(language);
  data.shift();

  let normalized = data.map<Site>(site => {
    const latitude = site.latitude.trim();
    const longitude = site.longitude.trim();

    return {
      code: site.code.trim(),
      name: site.name.trim(),
      province: site.province.trim(),
      latitude: latitude !== '' ? latitude.slice(0, -1) : null,
      longitude: longitude !== '' ? longitude.slice(0, -1) : null
    };
  });

  if (latitude && longitude) {
    const relevantData = normalized.filter(
      site => site.latitude && site.longitude
    );

    const orderedByDistance = geolib.orderByDistance(
      {
        latitude: geolib.useDecimal(latitude),
        longitude: geolib.useDecimal(longitude)
      },
      relevantData as any
    );

    return limit ? orderedByDistance.slice(0, limit) : orderedByDistance;
  }

  return limit ? normalized.slice(0, limit) : normalized;
}
