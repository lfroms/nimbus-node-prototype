import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';
import { normalizeEnvironmentCanadaSiteList, orderSitesByDistanceFromPoint } from '../helpers';

interface SiteListArgs {
  language: Language;
  latitude?: number;
  longitude?: number;
  limit?: number;
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
  const normalized = normalizeEnvironmentCanadaSiteList(data);

  if (latitude && longitude) {
    const orderedByDistance = orderSitesByDistanceFromPoint(latitude, longitude, normalized);

    return limit ? orderedByDistance.slice(0, limit) : orderedByDistance;
  }

  return limit ? normalized.slice(0, limit) : normalized;
}
