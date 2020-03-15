export interface Site {
  code: string;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
}

export default function normalizeEnvironmentCanadaSiteList(data: any[]): Site[] {
  data.shift();

  let normalized = data.map<Site>(site => {
    const trimmedLatitude = site.latitude.trim();
    const trimmedLongitude = site.longitude.trim();

    const latitude: number = trimmedLatitude !== '' ? trimmedLatitude.slice(0, -1) : null;
    const longitude: number = trimmedLongitude !== '' ? trimmedLongitude.slice(0, -1) : null

    return {
      code: site.code.trim().substr(1),
      name: site.name.trim(),
      province: site.province.trim(),
      latitude: 1 * latitude,
      // All entries in EC CSV are positive, should be negative.
      longitude: -longitude
    } as Site;
  });

  return normalized;
}