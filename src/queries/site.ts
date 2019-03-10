import { Context } from 'apollo-server-core';
import { parseSiteList, convertCharacterEncoding } from '../helpers';
import { EnvironmentCanadaAPI } from '../data_sources';

interface SiteByKeywordArgs {
  keyword: string;
}

interface Site {
  nameEn: string;
  nameFr: string;
  code: string;
  provinceCode: string;
}

export default async function site(
  _obj: any,
  args: SiteByKeywordArgs,
  context: Context<any>
) {
  const { keyword } = args;

  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  const text = await (api as EnvironmentCanadaAPI).getSites();
  const convertedText = convertCharacterEncoding(text);

  const list = (await parseSiteList(convertedText)) as Array<Site>;

  return list.filter((site: Site) => {
    const { nameEn, nameFr } = site;
    return (
      nameEn.toLowerCase().includes(keyword.toLowerCase()) ||
      nameFr.toLowerCase().includes(keyword.toLowerCase())
    );
  });
}
