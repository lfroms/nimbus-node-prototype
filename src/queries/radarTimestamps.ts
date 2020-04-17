import { RadarTimestampsQueryArgs } from '../schema';
import { AppContext } from '..';
import { RadarProviderToDataSourceRouter } from './routers';

// tslint:disable-next-line: typedef
export default async function radarTimestamps(
  _obj: any,
  args: RadarTimestampsQueryArgs,
  context: AppContext
) {
  const { provider } = args;
  const { dataSources } = context;

  try {
    const router = new RadarProviderToDataSourceRouter(provider, dataSources);
    return await router.getTimestamps();
  } catch (err) {
    console.error(err);

    // Return no data if an error has occurred.
    return [];
  }
}
