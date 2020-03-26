import { BulkWeatherQueryArgs } from '../schema';
import { AppContext } from '..';
import { Weather } from 'schemas';
import { LocationToDataSourceRouter } from './routers';

// tslint:disable-next-line: typedef
export default async function bulkWeather(
  _obj: any,
  args: BulkWeatherQueryArgs,
  context: AppContext
) {
  const { coordinates } = args;
  const { dataSources } = context;

  try {
    const outputWeatherReports: Array<Weather> = [];

    for (const coordinate of coordinates) {
      const router = new LocationToDataSourceRouter(coordinate, dataSources);
      outputWeatherReports.push(await router.getWeather());
    }

    return outputWeatherReports;
  } catch (err) {
    console.error(err);

    // Return no data if an error has occurred.
    return [];
  }
}
