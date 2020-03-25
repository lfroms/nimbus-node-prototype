import { Translator } from 'queries/translators';
import { Hourly, FeelsLike, Wind, FeelsLikeType } from 'schemas';
import { parseDateTimeAsUNIX } from '../helpers';

export default class HourlyTranslator implements Translator<Hourly[]> {
  private hourlyForecastGroup: Element | null;

  constructor(xmlDOM: Document) {
    this.hourlyForecastGroup = xmlDOM.getElementsByTagName('hourlyForecastGroup').item(0);
  }

  public translate(): Hourly[] {
    if (!this.hourlyForecastGroup) {
      return [];
    }

    const arrayOfForecasts = Array.from(
      this.hourlyForecastGroup?.getElementsByTagName('hourlyForecast')
    );

    return arrayOfForecasts.map(element => this.createHourlyForecast(this, element));
  }

  private createHourlyForecast(that: HourlyTranslator, element: Element): Hourly {
    return {
      time: that.createTime(element),
      summary: that.createSummary(element),
      icon: that.createIcon(element),
      temperature: that.createTemperature(element),
      feelsLike: that.createFeelsLike(element),
      wind: that.createWind(element),
      precipProbability: that.createPrecipProbability(element)
    };
  }

  private createTime(element: Element): number {
    const utcTimestamp = element.getAttribute('dateTimeUTC');
    return parseDateTimeAsUNIX(utcTimestamp || '');
  }

  private createSummary(element: Element): string | null {
    const summary = element.getElementsByTagName('condition').item(0)?.textContent;
    return summary || null;
  }

  private createIcon(element: Element): number | null {
    const icon = element.getElementsByTagName('iconCode').item(0)?.textContent;
    return icon ? parseInt(icon) : null;
  }

  private createTemperature(element: Element): number | null {
    const temperature = element.getElementsByTagName('temperature').item(0)?.textContent;
    return temperature ? parseFloat(temperature) : null;
  }

  private createFeelsLike(element: Element): FeelsLike {
    const humidex = element.getElementsByTagName('humidex').item(0);
    const windChill = element.getElementsByTagName('windChill').item(0);

    let temperature: string | null = null;
    let type: FeelsLikeType | null = null;

    if (humidex && humidex.textContent?.length) {
      temperature = humidex.textContent;
      type = 'humidex';
    } else if (windChill && humidex?.textContent?.length) {
      temperature = windChill.textContent;
      type = 'windChill';
    }

    return {
      temperature: temperature ? parseFloat(temperature) : null,
      type
    };
  }

  private createWind(element: Element): Wind {
    const wind: Wind = {
      speed: null,
      gust: null,
      direction: null,
      bearing: null
    };

    const windElement = element.getElementsByTagName('wind').item(0);

    if (!windElement) {
      return wind;
    }

    const speed = windElement.getElementsByTagName('speed').item(0)?.textContent;
    const gust = windElement.getElementsByTagName('gust').item(0)?.textContent;
    const direction = windElement.getElementsByTagName('direction').item(0)?.textContent;
    const bearing = windElement.getElementsByTagName('bearing').item(0)?.textContent;

    wind.speed = speed ? parseFloat(speed) : null;
    wind.gust = gust ? parseFloat(gust) : null;
    wind.direction = direction || null;
    wind.bearing = bearing ? parseFloat(bearing) : null;

    return wind;
  }

  private createPrecipProbability(element: Element): number | null {
    const precipProbability = element.getElementsByTagName('lop').item(0)?.textContent;
    return precipProbability ? parseFloat(precipProbability) / 100 : null;
  }
}
