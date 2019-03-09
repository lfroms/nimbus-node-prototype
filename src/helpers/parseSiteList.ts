import { parseString } from 'xml2js';

export default function parseSiteList(string: string) {
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
          resolve(result.siteList.site);
        }
      }
    );
  });
}
