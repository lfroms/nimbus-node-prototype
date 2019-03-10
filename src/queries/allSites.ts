import { Context } from 'apollo-server-core';
import { parseSiteList } from '../helpers';
import { EnvironmentCanadaAPI } from '../data_sources';

export default async function allSites(
  _obj: any,
  _args: any,
  context: Context<any>
) {
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  const text = await (api as EnvironmentCanadaAPI).getSites();

  return await parseSiteList(text);
}
