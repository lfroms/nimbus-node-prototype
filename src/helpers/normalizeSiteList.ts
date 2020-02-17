export interface Site {
  code: string;
  name: string;
  province: string;
  latitude: string;
  longitude: string;
}

export default function normalizeSiteList(data: any[]): Site[] {
  data.shift();

  let normalized = data.map<Site>(site => {
    const latitude = site.latitude.trim();
    const longitude = site.longitude.trim();

    return {
      code: site.code.trim().substr(1),
      name: site.name.trim(),
      province: site.province.trim(),
      latitude: latitude !== '' ? latitude.slice(0, -1) : null,
      longitude: longitude !== '' ? longitude.slice(0, -1) : null
    };
  });

  return normalized;
}