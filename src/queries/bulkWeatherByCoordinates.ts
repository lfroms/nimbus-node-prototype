import { parseSiteData, convertCharacterEncoding, normalizeSiteList, findNearestSiteByDistanceFromPoint, Site } from '../helpers';
import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface WeatherByCoordinateArgs {
  coordinates: Coordinate[];
  language: Language;
  units: 'imperial' | 'metric';
}

export default async function bulkWeatherByCoordinates(
  _obj: any,
  args: WeatherByCoordinateArgs,
  context: Context<any>
) {
  const { coordinates, language, units } = args;
  const {
    dataSources: { environmentCanadaAPI: api }
  } = context;

  try {
    const data = await (api as EnvironmentCanadaAPI).getSites(language);
    const normalized = normalizeSiteList(data);

    let foundSites: Site[] = []

    for (const coordinate of coordinates) {
      const nearestSite = findNearestSiteByDistanceFromPoint(coordinate.latitude, coordinate.longitude, normalized);
      foundSites.push(nearestSite)
    }

    let outputWeatherReports: Array<any> = []

    for (const foundSite of foundSites) {
      const text = await (api as EnvironmentCanadaAPI).getWeather(
        foundSite.province,
        parseInt(foundSite.code),
        language
      );

      const convertedText = convertCharacterEncoding(text);

      outputWeatherReports.push({
        ...(await parseSiteData(convertedText)),
        units
      });
    }

    return outputWeatherReports;

  } catch (err) {
    // Return no data if an error has occurred.
    return null;
  }
}
