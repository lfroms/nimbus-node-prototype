import { parseString } from 'xml2js';

export default function parseSiteData(string: string) {
  return new Promise<Object>(function(resolve, reject) {
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
