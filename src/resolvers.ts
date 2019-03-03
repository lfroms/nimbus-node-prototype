import fetch from 'node-fetch';

import { dateTime } from './resolvers/field';
import { parseSiteData } from './helpers';

interface SiteArgs {
  code: number;
  area: string;
  language?: string;
}

export default {
  Query: {
    async site(_obj: any, args: SiteArgs) {
      const { code, area, language = 'e' } = args;

      const paddedSiteCode: String = code.toString().padStart(7, '0');
      const filename = `s${paddedSiteCode}_${language}`;

      const res = await fetch(
        `http://dd.weather.gc.ca/citypage_weather/xml/${area}/${filename}.xml`
      );
      const text = await res.text();

      return await parseSiteData(text);
    }
  },
  CurrentConditions: {
    dateTime
  },
  ForecastGroup: {
    dateTime
  },
  HourlyForecastGroup: {
    dateTime
  },
  RiseSet: {
    dateTime
  },
  SiteData: {
    dateTime
  }
};
