import { WeatherQueryArgs } from '../schema';
import { AppContext } from '..';
import { LocationToDataSourceRouter } from './routers';

// tslint:disable-next-line: typedef
export default async function weather(_obj: any, args: WeatherQueryArgs, context: AppContext) {
  const { coordinate } = args;
  const { dataSources } = context;

  try {
    const router = new LocationToDataSourceRouter(coordinate, dataSources);
    return await router.getWeather();
  } catch (err) {
    console.error(err);

    // Return no data if an error has occurred.
    return null;
  }
}
