import fetch from 'node-fetch';
import { parseSiteList } from '../helpers';

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
  args: SiteByKeywordArgs
) {
  const { keyword } = args;

  const res = await fetch(
    `http://dd.weather.gc.ca/citypage_weather/xml/siteList.xml`
  );
  const text = await res.text();
  const list = (await parseSiteList(text)) as Array<Site>;

  return list.filter((site: Site) => {
    const { nameEn, nameFr } = site;
    return nameEn.includes(keyword) || nameFr.includes(keyword);
  });
}
