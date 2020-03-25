import { Translator } from 'queries/translators';
import { Today } from 'schemas';
import { parseDateTimeAsUNIX } from '../helpers';

export default class TodayTranslator implements Translator<Today> {
  private forecastGroup: Element | null;
  private riseSet: Element | null;

  constructor(xmlDOM: Document) {
    this.forecastGroup = xmlDOM.getElementsByTagName('forecastGroup').item(0);
    this.riseSet = xmlDOM.getElementsByTagName('riseSet').item(0);
  }

  public translate(): Today {
    return {
      highTemperature: this.createHighTemperature(),
      lowTemperature: this.createLowTemperature(),
      sunriseTime: this.createSunriseTime(),
      sunsetTime: this.createSunsetTime()
    };
  }

  private createHighTemperature(): number | null {
    const todayForecastElement = this.forecastGroup?.querySelector(
      "forecast > period[textForecastName='Today']"
    )?.parentElement;

    const temperatures = todayForecastElement?.getElementsByTagName('temperatures').item(0);
    const highTemperature = temperatures?.getElementsByTagName('temperature').item(0)?.textContent;

    return highTemperature ? parseFloat(highTemperature) : null;
  }

  private createLowTemperature(): number | null {
    const tonightForecastElement = this.forecastGroup?.querySelector(
      "forecast > period[textForecastName='Tonight']"
    )?.parentElement;

    const temperatures = tonightForecastElement?.getElementsByTagName('temperatures').item(0);
    const lowTemperature = temperatures?.getElementsByTagName('temperature').item(0)?.textContent;

    return lowTemperature ? parseFloat(lowTemperature) : null;
  }

  private createSunriseTime(): number | null {
    const sunriseTime = this.riseSet
      ?.querySelector("dateTime[name='sunrise'][zone='UTC']")
      ?.getElementsByTagName('timeStamp')
      .item(0)?.textContent;

    return sunriseTime ? parseDateTimeAsUNIX(sunriseTime) : null;
  }

  private createSunsetTime(): number | null {
    const sunsetTime = this.riseSet
      ?.querySelector("dateTime[name='sunset'][zone='UTC']")
      ?.getElementsByTagName('timeStamp')
      .item(0)?.textContent;

    return sunsetTime ? parseDateTimeAsUNIX(sunsetTime) : null;
  }
}
