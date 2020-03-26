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
      stationName: this.createStationName(),
      country: subtree?.getElementsByTagName('country').item(0)!.textContent!,
      coordinate: this.createCoordinate(),
      distance: getDistance(this.requestedCoordinate, this.actualCoordinate)
    };
  }

  private createStationName(): string | null {
    const stationElement = this.xmlDOM
      .getElementsByTagName('currentConditions')
      .item(0)
      ?.getElementsByTagName('station')
      .item(0)?.textContent;
    return stationElement || null;
  }

  private createCoordinate(): Coordinate {
    return {
      latitude: this.actualCoordinate.latitude,
      longitude: this.actualCoordinate.longitude
    };
  }
}
