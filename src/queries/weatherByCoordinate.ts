import { parseSiteData, convertCharacterEncoding, normalizeEnvironmentCanadaSiteList, findNearestSiteByDistanceFromPoint } from '../helpers';
import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface WeatherByCoordinateArgs {
  latitude: number;
  longitude: number;
  language: Language;
  units: 'imperial' | 'metric';
}

export default async function weatherByCoordinate(
  _obj: any,
  args: WeatherByCoordinateArgs,
  context: Context<any>
) {
  const { latitude, longitude, language, units } = args;
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  try {
    const data = await (api as EnvironmentCanadaAPI).getSites(language);
    const normalized = normalizeEnvironmentCanadaSiteList(data);

    const nearestSite = findNearestSiteByDistanceFromPoint(latitude, longitude, normalized);

    const text = await (api as EnvironmentCanadaAPI).getWeather(
      nearestSite.province,
      parseInt(nearestSite.code),
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
