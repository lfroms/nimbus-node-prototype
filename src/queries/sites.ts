import { Context } from 'apollo-server-core';
import { parseSiteList, convertCharacterEncoding } from '../helpers';
import { EnvironmentCanadaAPI } from '../data_sources';

export default async function sites(
  _obj: any,
  _args: any,
  context: Context<any>
) {
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  const text = await (api as EnvironmentCanadaAPI).getSites();

  const convertedText = convertCharacterEncoding(text);
  return await parseSiteList(convertedText);
}
