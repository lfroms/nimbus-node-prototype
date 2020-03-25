import { Translator } from 'queries/translators';
import { Alert, AlertType } from 'schemas';
import { parseDateTimeAsUNIX } from '../helpers';
import { titleCase } from '../../../../helpers';

export default class AlertsTranslator implements Translator<Alert[]> {
  private warnings: Element | null;

  constructor(xmlDOM: Document) {
    this.warnings = xmlDOM.getElementsByTagName('warnings').item(0);
  }

  public translate(): Alert[] {
    if (!this.warnings) {
      return [];
    }

    const arrayOfWarnings = Array.from(this.warnings?.getElementsByTagName('event'));

    return arrayOfWarnings.map(element => this.createAlert(this, element));
  }

  private createAlert(that: AlertsTranslator, element: Element): Alert {
    return {
      time: that.createTime(element),
      title: that.createTitle(element),
      type: that.createType(element),
      uri: that.createURI()
    };
  }

  private createTime(element: Element): number {
    const utcTimestamp = element.querySelector("dateTime[name='eventIssue'][zone='UTC']")
      ?.textContent;

    return parseDateTimeAsUNIX(utcTimestamp || '');
  }

  private createTitle(element: Element): string {
    return titleCase(element.getAttribute('description') || 'Alert');
  }

  private createType(element: Element): AlertType {
    const type = element.getAttribute('type')?.toLowerCase();

    switch (type) {
      case 'advisory':
        return 'advisory';
      case 'warning':
        return 'warning';
      case 'watch':
        return 'watch';
      case 'ended':
        return 'ended';
      case 'statement':
        return 'statement';
      default:
        return 'warning';
    }
  }

  private createURI(): string {
    return this.warnings?.getAttribute('url') || 'https://weather.gc.ca';
  }
}
