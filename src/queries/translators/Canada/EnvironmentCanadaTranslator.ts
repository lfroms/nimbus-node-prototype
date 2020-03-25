import { Weather, Coordinate, Currently, Location, Today, Hourly, Daily, Alert } from 'schemas';
import { LocationTranslator, CurrentlyTranslator } from './sub_translators';
import { Translator } from '..';
import { JSDOM } from 'jsdom';

export default class EnvironmentCanadaTranslator implements Translator<Weather> {
  private xmlDOM: Document;

  private requestedCoordinate: Coordinate;
  private actualCoordinate: Coordinate;

  constructor(xmlString: string, requestedCoordinate: Coordinate, actualCoordinate: Coordinate) {
    this.xmlDOM = new JSDOM(xmlString, { contentType: 'text/xml' }).window.document;

    this.requestedCoordinate = requestedCoordinate;
    this.actualCoordinate = actualCoordinate;
  }

  public translate(): Weather {
    return {
      location: this.createLocation(),
      today: this.createToday(),
      currently: this.createCurrently(),
      hourly: this.createHourly(),
      daily: this.createDaily(),
      alerts: this.createAlerts()
    };
  }

  private createLocation(): Location {
    const translator = new LocationTranslator(
      this.xmlDOM,
      this.requestedCoordinate,
      this.actualCoordinate
    );

    return translator.translate();
  }

  private createToday(): Today {
    throw new Error('Method not implemented.');
  }

  private createCurrently(): Currently {
    const translator = new CurrentlyTranslator(this.xmlDOM);

    return translator.translate();
  }

  private createHourly(): Hourly[] {
    throw new Error('Method not implemented.');
  }
  private createDaily(): Daily[] {
    throw new Error('Method not implemented.');
  }
  private createAlerts(): Alert[] {
    throw new Error('Method not implemented.');
  }
}
