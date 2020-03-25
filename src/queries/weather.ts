import { AppContext } from '..';
import { WeatherQueryArgs } from '../schema';

// tslint:disable-next-line: typedef
export default async function weather(_obj: any, args: WeatherQueryArgs, context: AppContext) {
  if (args.coordinate == null) {
    return null;
  }

  const {
    coordinate: { latitude, longitude }
  } = args;

  const {
    dataSources: { environmentCanadaDatamart, canadianMeteorologicalServicesDocs }
  } = context;

  try {
    const text = await environmentCanadaDatamart.getWeather(
      latitude,
      longitude,
      canadianMeteorologicalServicesDocs
    );

    return text;
  } catch (err) {
    console.error(err);
    return null;
  }
}
