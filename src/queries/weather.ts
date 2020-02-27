import { parseSiteData, convertCharacterEncoding, ImperialMetric } from '../helpers';
import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface WeatherArgs {
  siteCode: number;
  province: string;
  language?: Language;
  units: ImperialMetric;
}

export default async function weather(
  _obj: any,
  args: WeatherArgs,
  context: Context<any>
) {
  const { siteCode, province, units, language = 'e' } = args;
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  try {
    const text = await (api as EnvironmentCanadaAPI).getWeather(
      province,
      siteCode,
      language
    );

    const convertedText = convertCharacterEncoding(text);

    return {
      ...(await parseSiteData(convertedText)),
      units
    };
  } catch (err) {
    // Return no data if an error has occurred.
    return null;
  }
}
