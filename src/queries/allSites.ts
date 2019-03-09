import fetch from 'node-fetch';
import { parseSiteList } from '../helpers';

export default async function allSites(_obj: any) {
  const res = await fetch(
    `http://dd.weather.gc.ca/citypage_weather/xml/siteList.xml`
  );
  const text = await res.text();

  return await parseSiteList(text);
}
