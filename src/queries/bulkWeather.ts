import { BulkWeatherQueryArgs } from '../schema';
import { AppContext } from '..';

// tslint:disable-next-line: typedef
export default async function bulkWeather(
  _obj: any,
  args: BulkWeatherQueryArgs,
  context: AppContext
) {
  const { coordinates } = args;
  const {
    dataSources: { environmentCanadaDatamart, canadianMeteorologicalServicesDocs }
  } = context;

  try {
    const outputWeatherReports: Array<any> = [];

    for (const coordinate of coordinates) {
      const text = await environmentCanadaDatamart.getWeather(
        coordinate.latitude,
        coordinate.longitude,
        canadianMeteorologicalServicesDocs
      );

      outputWeatherReports.push(text);
    }

    return outputWeatherReports;
  } catch (err) {
    console.error(err);
    // Return no data if an error has occurred.
    return null;
  }
}
