import { parseSiteData, convertCharacterEncoding } from '../helpers';
import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface WeatherArgs {
  code: number;
  region: string;
  language?: Language;
}

export default async function weather(
  _obj: any,
  args: WeatherArgs,
  context: Context<any>
) {
  const { code, region, language = 'e' } = args;
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  const text = await (api as EnvironmentCanadaAPI).getWeather(
    region,
    code,
    language
  );

  const convertedText = convertCharacterEncoding(text);
  return await parseSiteData(convertedText);
}
