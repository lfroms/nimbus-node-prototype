import { parseSiteData, convertCharacterEncoding, normalizeEnvironmentCanadaSiteList, findNearestSiteByDistanceFromPoint, ImperialMetric, Coordinate } from '../helpers';
import { Context } from 'apollo-server-core';
import { EnvironmentCanadaAPI, Language } from '../data_sources';

interface WeatherByCoordinateArgs {
  coordinate?: Coordinate;
  language: Language;
  units: ImperialMetric;
}

export default async function weatherByCoordinate(
  _obj: any,
  args: WeatherByCoordinateArgs,
  context: Context<any>
) {
  if (args.coordinate == null) {
    return null
  }

  const { coordinate: { latitude, longitude }, language, units } = args;
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
      units,
      requestedCoordinate: {
        latitude,
        longitude
      },
      nearestCoordinate: {
        latitude: nearestSite.latitude,
        longitude: nearestSite.longitude
      }
    };
  } catch (err) {
    // Return no data if an error has occurred.
    return null;
  }
}
