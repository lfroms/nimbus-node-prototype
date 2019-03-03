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
    siteData: (): any => {
      return fetch(
        'http://dd.weather.gc.ca/citypage_weather/xml/ON/s0000430_e.xml'
      )
        .then(res => res.text())
        .then(text => parseSiteData(text));
    }
  }
};
