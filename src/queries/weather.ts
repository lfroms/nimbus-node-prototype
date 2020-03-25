import { WeatherQueryArgs } from '../schema';
import { AppContext } from '..';
import { EnvironmentCanadaTranslator } from './translators';

// tslint:disable-next-line: typedef
export default async function weather(_obj: any, args: WeatherQueryArgs, context: AppContext) {
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
      console.log(
        new EnvironmentCanadaTranslator(
          text,
          { latitude: 0, longitude: 0 },
          { latitude: 0, longitude: 0 }
        ).translate()
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
