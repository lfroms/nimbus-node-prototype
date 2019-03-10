import { Context } from 'apollo-server-core';
import { parseSiteList } from '../helpers';
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

export default async function siteByKeyword(
  _obj: any,
  args: SiteByKeywordArgs,
  context: Context<any>
) {
  const { keyword } = args;

  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  const text = await (api as EnvironmentCanadaAPI).getSites();
  const list = (await parseSiteList(text)) as Array<Site>;

  return list.filter((site: Site) => {
    const { nameEn, nameFr } = site;
    return (
      nameEn.toLowerCase().includes(keyword.toLowerCase()) ||
      nameFr.toLowerCase().includes(keyword.toLowerCase())
    );
  });
}
