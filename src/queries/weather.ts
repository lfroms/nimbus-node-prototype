import fetch from 'node-fetch';
import { parseSiteData } from '../helpers';

interface WeatherArgs {
  code: number;
  region: string;
  language?: string;
}

export default async function weather(_obj: any, args: WeatherArgs) {
  const { code, region, language = 'e' } = args;

  const paddedSiteCode: String = code.toString().padStart(7, '0');
  const filename = `s${paddedSiteCode}_${language}`;

  const res = await fetch(
    `http://dd.weather.gc.ca/citypage_weather/xml/${region}/${filename}.xml`
  );
  const text = await res.text();

  return await parseSiteData(text);
}
