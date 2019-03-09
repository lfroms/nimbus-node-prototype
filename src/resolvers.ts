import { Site as site } from './queries';

import {
  dateTime,
  forecast,
  hourlyForecast,
  riseSetDateTime
} from './resolvers/field';
import {
  historicPrecip as multipleHistoricPrecip,
  temperature as multipleTemperature,
  precipitation as multiplePrecipitation,
  accumulation as multipleAccumulation,
  wind as multipleWind,
  windChill as multipleWindChill,
  humidex as multipleHumidex
} from './resolvers/field/ensure_array';

export default {
  Query: {
    site
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
    dateTime: riseSetDateTime
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
