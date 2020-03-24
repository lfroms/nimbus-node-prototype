import { Site } from './normalizeEnvironmentCanadaSiteList';

import geolib from 'geolib';

export default function orderSitesbyDistanceFromPoint(
  latitude: number,
  longitude: number,
  sites: Site[]
): Site[] {
  const relevantData = sites.filter(site => site.latitude && site.longitude);

  const orderedByDistance = geolib.orderByDistance(
    {
      latitude: geolib.useDecimal(latitude),
      longitude: geolib.useDecimal(longitude)
    },
    // Site contains relevant fields, but also contains extras.
    relevantData as any
  );

  return (orderedByDistance as unknown) as Site[];
}
