import { weather, bulkWeather, radarTimestamps } from './queries';

export default {
  Query: {
    weather,
    bulkWeather,
    radarTimestamps,
  },
  DataPoint: {
    __resolveType(): null {
      return null;
    },
  },
};
