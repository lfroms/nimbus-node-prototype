import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface SitesByLocationArgs {
  language?: Language;
  latitude: string;
  longitude: string;
}

export default async function site(
  _obj: any,
  args: SitesByLocationArgs,
  context: Context<any>
) {
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;
  const { language } = args;

  return await (api as EnvironmentCanadaAPI).getSites(language);
}
