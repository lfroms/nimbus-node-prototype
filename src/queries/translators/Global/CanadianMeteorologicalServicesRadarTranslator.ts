import { Translator } from '..';
import { JSDOM } from 'jsdom';
import { RadarTimestamps } from 'schemas';
import moment from 'moment';

export default class CanadianMeteorologicalServicesRadarTranslator
  implements Translator<RadarTimestamps> {
  private xmlDOM: Document;

  constructor(xmlString: string) {
    this.xmlDOM = new JSDOM(xmlString, { contentType: 'text/xml' }).window.document;
  }

  public translate(): RadarTimestamps {
    const dimension = this.getDimension();

    if (!dimension) {
      return [];
    }

    const output: number[] = [];
    const startTime = moment(this.getStartTime(dimension));
    const endTime = moment(this.getEndTime(dimension));
    const minutes = this.getIntervalMinutes(dimension);

    let currentTime = startTime.clone();

    while (currentTime.isBefore(endTime) || currentTime.isSame(endTime)) {
      currentTime = startTime.add(minutes, 'minutes');
      output.push(currentTime.unix());
    }

    // Last radar image usually isn't ready on time.
    output.pop();

    return output;
  }

  private getDimension(): string | null {
    const element = this.xmlDOM.getElementsByTagName('Dimension').item(0);
    return element?.textContent || null;
  }

  private getStartTime(iso: string): string {
    return iso.split('/')[0];
  }

  private getEndTime(iso: string): string {
    return iso.split('/')[1];
  }

  private getIntervalMinutes(iso: string): number {
    const duration = iso.split('/')[2];
    return moment.duration(duration).minutes();
  }
}
