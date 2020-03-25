import { Weather, Coordinate, Currently, Location, Today, Hourly, Daily, Alert } from 'schemas';
import {
  LocationTranslator,
  CurrentlyTranslator,
  TodayTranslator,
  HourlyTranslator,
  AlertsTranslator
} from './sub_translators';
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
    const translator = new TodayTranslator(this.xmlDOM);
    return translator.translate();
  }

  private createCurrently(): Currently {
    const translator = new CurrentlyTranslator(this.xmlDOM);
    return translator.translate();
  }

  private createHourly(): Hourly[] {
    const translator = new HourlyTranslator(this.xmlDOM);
    return translator.translate();
  }

  private createDaily(): Daily[] {
    return null!;
  }

  private createAlerts(): Alert[] {
    const translator = new AlertsTranslator(this.xmlDOM);
    return translator.translate();
  }
}
