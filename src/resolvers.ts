import { weather, bulkWeather } from './queries';

export default {
  Query: {
    weather,
    bulkWeather
  },
  DataPoint: {
    __resolveType(): null {
      return null;
    }
  }
};
