import { weather } from './queries';

export default {
  Query: {
    weather
  },
  DataPoint: {
    __resolveType(): null {
      return null;
    }
  }
};
