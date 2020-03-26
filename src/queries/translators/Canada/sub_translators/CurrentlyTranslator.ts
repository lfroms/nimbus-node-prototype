import { Currently, FeelsLike, FeelsLikeType, Wind, Pressure } from 'schemas';
import { Translator } from 'queries/translators';
import { parseDateTimeAsUNIX } from '../helpers';

export default class CurrentlyTranslator implements Translator<Currently> {
  private xmlDOM: Document;
  private subtree: Element | null;

  constructor(xmlDOM: Document) {
    this.xmlDOM = xmlDOM;
    this.subtree = xmlDOM.getElementsByTagName('currentConditions').item(0);
  }

  public translate(): Currently {
    return {
      time: this.createTime(),
      summary: this.createSummary(),
      icon: this.createIcon(),
      temperature: this.createTemperature(),
      feelsLike: this.createFeelsLike(),
      wind: this.createWind(),
      dewPoint: this.createDewPoint(),
      humidity: this.createHumidity(),
      pressure: this.createPressure(),
      visibility: this.createVisibility(),
      uvIndex: this.createUVIndex()
    };
  }

  private createTime(): number {
    const observationTimestamp = this.subtree?.querySelector(
      "dateTime[name='observation'][zone='UTC']"
    )?.textContent;

    if (observationTimestamp) {
      return parseDateTimeAsUNIX(observationTimestamp);
    }

    const xmlCreation = this.xmlDOM.querySelector("dateTime[name='xmlCreation'][zone='UTC']")
      ?.textContent;

    return parseDateTimeAsUNIX(xmlCreation || '0');
  }

  private createSummary(): string | null {
    return this.subtree?.getElementsByTagName('condition').item(0)?.textContent || null;
  }

  private createIcon(): number | null {
    const icon = this.subtree?.getElementsByTagName('iconCode').item(0)?.textContent;

    if (!icon) {
      return null;
    }

    return parseInt(icon);
  }

  private createTemperature(): number | null {
    const temperature = this.subtree?.getElementsByTagName('temperature').item(0)?.textContent;

    if (!temperature) {
      return null;
    }

    return parseFloat(temperature);
  }

  private createFeelsLike(): FeelsLike {
    const humidex = this.subtree?.getElementsByTagName('humidex').item(0);
    const windChill = this.subtree?.getElementsByTagName('windChill').item(0);

    let temperature: string | null = null;
    let type: FeelsLikeType | null = null;

    if (humidex) {
      temperature = humidex.textContent;
      type = 'humidex';
    } else if (windChill) {
      temperature = windChill.textContent;
      type = 'windChill';
    }

    return {
      temperature: temperature ? parseFloat(temperature) : null,
      type
    };
  }

  private createWind(): Wind {
    const wind: Wind = {
      speed: null,
      gust: null,
      direction: null,
      bearing: null
    };

    const windElement = this.subtree?.getElementsByTagName('wind').item(0);

    if (!windElement) {
      return wind;
    }

    const speed = windElement.getElementsByTagName('speed').item(0)?.textContent;
    const gust = windElement.getElementsByTagName('gust').item(0)?.textContent;
    const direction = windElement.getElementsByTagName('direction').item(0)?.textContent;
    const bearing = windElement.getElementsByTagName('bearing').item(0)?.textContent;

    if (speed) {
      const parsedSpeed = parseFloat(speed);

      wind.speed = !isNaN(parsedSpeed) ? parsedSpeed.toString() : speed;
    }

    wind.gust = gust ? parseFloat(gust) : null;
    wind.direction = direction || null;
    wind.bearing = bearing ? parseFloat(bearing) : null;

    return wind;
  }

  private createDewPoint(): number | null {
    const dewpoint = this.subtree?.getElementsByTagName('dewpoint').item(0)?.textContent;
    return dewpoint ? parseFloat(dewpoint) : null;
  }

  private createHumidity(): number | null {
    const humidity = this.subtree?.getElementsByTagName('relativeHumidity').item(0)?.textContent;
    return humidity ? parseFloat(humidity) / 100 : null;
  }

  private createPressure(): Pressure {
    const pressure: Pressure = {
      value: null,
      tendency: null,
      change: null
    };

    const pressureElement = this.subtree?.getElementsByTagName('pressure').item(0);

    if (!pressure) {
      return pressure;
    }

    const value = pressureElement?.textContent;
    const tendency = pressureElement?.getAttribute('tendency')?.toString();
    const change = pressureElement?.getAttribute('change')?.toString();

    pressure.value = value ? parseFloat(value) : null;
    pressure.change = change ? parseFloat(change) : null;

    switch (tendency) {
      case 'rising':
        pressure.tendency = 'rising';
        break;
      case 'falling':
        pressure.tendency = 'falling';
        break;
      default:
        pressure.tendency = 'stable';
        break;
    }

    return pressure;
  }

  private createVisibility(): number | null {
    const visibility = this.subtree?.getElementsByTagName('visibility').item(0)?.textContent;
    return visibility ? parseFloat(visibility) : null;
  }

  private createUVIndex(): number | null {
    return null;
  }
}
