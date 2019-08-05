import { weather, sites } from './queries';
import { time, yesterdayHigh, yesterdayLow } from './resolvers/field';
import {
  currentConditions,
  warnings,
  normals,
  location,
  dailyForecast,
  hourlyForecast,
  sun,
  yesterday,
  wind,
  station,
  events,
  days,
  winds,
  hours,
  hourlyWind,
  todaySummary,
  units
} from './resolvers/';

export default {
  Query: {
    weather,
    sites
  },
  WeatherReport: {
    location,
    currentConditions,
    warnings,
    normals,
    dailyForecast,
    hourlyForecast,
    sun,
    yesterday,
    todaySummary,
    units
  },
  CurrentConditions: {
    wind,
    station,
    time
  },
  Warnings: {
    events
  },
  Event: {
    time
  },
  DailyForecast: {
    time,
    days
  },
  Day: {
    winds
  },
  HourlyForecast: {
    time,
    hours
  },
  Hour: {
    wind: hourlyWind
  },
  Yesterday: {
    high: yesterdayHigh,
    low: yesterdayLow
  }
};
