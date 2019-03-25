import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI } from '../data_sources';
import { LanguageAbbr } from '../data_sources/EnvironmentCanadaAPI';

interface SiteListArgs {
  language: LanguageAbbr;
}

export default async function sites(
  _obj: any,
  args: SiteListArgs,
  context: Context<any>
) {
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;
  const { language } = args;

  const data = await (api as EnvironmentCanadaAPI).getSites(language);
  data.shift();
  return data;
}
