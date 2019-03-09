import fetch from 'node-fetch';

import { dateTime, forecast, hourlyForecast } from './resolvers/field';
import {
  historicPrecip as multipleHistoricPrecip,
  temperature as multipleTemperature,
  precipitation as multiplePrecipitation,
  accumulation as multipleAccumulation,
  wind as multipleWind,
  windChill as multipleWindChill,
  humidex as multipleHumidex
} from './resolvers/field/ensure_array';
import { parseSiteData } from './helpers';

interface SiteArgs {
  code: number;
  region: string;
  language?: string;
}

export default {
  Query: {
    async site(_obj: any, args: SiteArgs) {
      const { code, region, language = 'e' } = args;

      const paddedSiteCode: String = code.toString().padStart(7, '0');
      const filename = `s${paddedSiteCode}_${language}`;

      const res = await fetch(
        `http://dd.weather.gc.ca/citypage_weather/xml/${region}/${filename}.xml`
      );
      const text = await res.text();

      return await parseSiteData(text);
    }
  },
  CurrentConditions: {
    dateTime
  },
  ForecastGroup: {
    forecast,
    dateTime
  },
  HourlyForecastGroup: {
    hourlyForecast,
    dateTime
  },
  RiseSet: {
    dateTime
  },
  SiteData: {
    dateTime
  },
  YesterdayConditions: {
    precip: multipleHistoricPrecip,
    temperature: multipleTemperature
  },
  Almanac: {
    precipitation: multiplePrecipitation,
    temperature: multipleTemperature
  },
  Temperatures: {
    temperature: multipleTemperature
  },
  Precipitation: {
    accumulation: multipleAccumulation
  },
  Winds: {
    wind: multipleWind
  },
  WindChill: {
    calculated: multipleWindChill
  },
  Humidex: {
    calculated: multipleHumidex
  },
  RegionalNormals: {
    temperature: multipleTemperature
  }
};
