import { orderByDistance, getDistance } from 'geolib';
import { Site, SiteWithDistance } from '../types';

// Workaround for Geolib typin bug
interface GeolibCoordinate {
  latitude: number;
  longitude: number;
}

export default function findClosestSite(
  latitude: number,
  longitude: number,
  sites: Site[],
  rank: number
): SiteWithDistance {
  const sitesWithCoordinates = sites.filter(site => site.latitude && site.longitude);

  const coordinateSet: GeolibCoordinate[] = sitesWithCoordinates.map(site => ({
    latitude: site.latitude,
    longitude: site.longitude
  }));

  const orderedByDistance = orderByDistance(
    { latitude, longitude },
    coordinateSet
  ) as GeolibCoordinate[];

  const outputSites: SiteWithDistance[] = [];

  orderedByDistance.forEach(item => {
    const site = sitesWithCoordinates.find(
      site => site.latitude === item.latitude && site.longitude === item.longitude
    );

    if (!site) {
      return;
    }

    const transformedSite: SiteWithDistance = {
      ...site,
      distanceFromRequestedCoordinate: getDistance(item, {
        latitude: site.latitude,
        longitude: site.longitude
      })
    };

    outputSites.push(transformedSite);
  });

  if (outputSites[rank] != undefined) {
    return outputSites[rank];
  }

  return outputSites[0];
}
