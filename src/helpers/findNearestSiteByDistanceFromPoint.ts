import geolib from 'geolib';
import { Site } from './normalizeEnvironmentCanadaSiteList';

export default function findNearestSiteByDistanceFromPoint(
  latitude: number,
  longitude: number,
  sites: Site[]
): Site {
  const relevantData = sites.filter(site => site.latitude && site.longitude);

  const orderedByDistance = geolib.findNearest(
    {
      latitude: geolib.useDecimal(latitude),
      longitude: geolib.useDecimal(longitude)
    },
    // Site contains relevant fields, but also contains extras.
    relevantData as any
  );

  return (orderedByDistance as unknown) as Site;
}
