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
      precipProbability: this.createPrecipProbability(),
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

  private createPrecipProbability(): number | null {
    throw new Error('Method not implemented.');
  }

  private createWind(): Wind {
    throw new Error('Method not implemented.');
  }

  private createDewPoint(): number | null {
    throw new Error('Method not implemented.');
  }

  private createHumidity(): number | null {
    throw new Error('Method not implemented.');
  }

  private createPressure(): Pressure {
    throw new Error('Method not implemented.');
  }

  private createVisibility(): number | null {
    throw new Error('Method not implemented.');
  }

  private createUVIndex(): number | null {
    throw new Error('Method not implemented.');
  }
}
