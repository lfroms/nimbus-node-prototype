import fetch from 'node-fetch';
import { parseString } from 'xml2js';

function parseSiteData(string: string) {
  return new Promise(function(resolve, reject) {
    parseString(
      string,
      {
        charkey: 'value',
        mergeAttrs: true,
        explicitArray: false
      },
      function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result.siteData);
        }
      }
    );
  });
}

export default {
  Query: {
    async site(_obj: any, args: any) {
      const { code } = args;

      const res = await fetch(
        `http://dd.weather.gc.ca/citypage_weather/xml/ON/s0000${code}_e.xml`
      );
      const text = await res.text();

      return await parseSiteData(text);
    }
  }
};
