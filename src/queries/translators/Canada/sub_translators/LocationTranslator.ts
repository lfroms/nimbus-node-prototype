import { getDistance } from 'geolib';
import { Location, Coordinate } from 'schemas';
import { Translator } from '../..';

export default class LocationTranslator implements Translator<Location> {
  private xmlDOM: Document;
  private requestedCoordinate: Coordinate;
  private actualCoordinate: Coordinate;

  constructor(xmlDOM: Document, requestedCoordinate: Coordinate, actualCoordinate: Coordinate) {
    this.xmlDOM = xmlDOM;
    this.requestedCoordinate = requestedCoordinate;
    this.actualCoordinate = actualCoordinate;
  }

  public translate(): Location {
    const subtree = this.xmlDOM.getElementsByTagName('location').item(0);

    return {
      regionName: subtree?.getElementsByTagName('name').item(0)?.textContent || null,
      country: subtree?.getElementsByTagName('country').item(0)!.textContent!,
      coordinate: this.createCoordinate(),
      distance: getDistance(this.requestedCoordinate, this.actualCoordinate)
    };
  }

  private createCoordinate(): Coordinate {
    return {
      latitude: this.actualCoordinate.latitude,
      longitude: this.actualCoordinate.longitude
    };
  }
}
