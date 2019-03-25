import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface SiteListArgs {
  language: Language;
  latitude?: string;
  longitude?: string;
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
  const { language, limit } = args;

  const data = await (api as EnvironmentCanadaAPI).getSites(language);
  data.shift();
  return limit ? data.slice(0, limit) : data;
}
