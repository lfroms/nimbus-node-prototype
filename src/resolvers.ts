import { weather, allSites, siteByKeyword } from './queries';

import {
  dateTime,
  forecast,
  hourlyForecast,
  riseSetDateTime,
  code
} from './resolvers/field';
import {
  historicPrecip as multipleHistoricPrecip,
  temperature as multipleTemperature,
  precipitation as multiplePrecipitation,
  accumulation as multipleAccumulation,
  wind as multipleWind,
  windChill as multipleWindChill,
  humidex as multipleHumidex,
  warningEvent as multipleWarningEvent
} from './resolvers/field/ensure_array';

export default {
  Query: {
    weather,
    allSites,
    siteByKeyword
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
  },
  Site: {
    code
  },
  Warnings: {
    events: multipleWarningEvent
  }
};
