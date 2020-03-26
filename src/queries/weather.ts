import { WeatherQueryArgs } from '../schema';
import { AppContext } from '..';
import { EnvironmentCanadaTranslator } from './translators';
import { Weather } from 'schemas';
import { LocationToDataSourceRouter } from './routers';

// tslint:disable-next-line: typedef
export default async function weather(_obj: any, args: WeatherQueryArgs, context: AppContext) {
  const { coordinates } = args;
  const {
    dataSources,
    dataSources: { canadianMeteorologicalServicesDocs }
  } = context;

  try {
    const outputWeatherReports: Array<Weather> = [];

    for (const coordinate of coordinates) {
      const dataSource = new LocationToDataSourceRouter(coordinate, dataSources).dataSource();

      const response = await dataSource.getWeather(
        coordinate.latitude,
        coordinate.longitude,
        canadianMeteorologicalServicesDocs
      );

      const weather = new EnvironmentCanadaTranslator(
        response.dataString,
        coordinate,
        response.actualCoordinate
      ).translate();

      outputWeatherReports.push(weather);
    }

    return outputWeatherReports;
  } catch (err) {
    console.error(err);
    // Return no data if an error has occurred.
    return null;
  }
}
