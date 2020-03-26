import moment from 'moment';
import { Translator } from 'queries/translators';
import { Daily, HalfDayCondition, FeelsLike, Wind, FeelsLikeType } from 'schemas';
import { parseDateTimeAsUNIX } from '../helpers';

interface DayNightPair {
  day: Element | null;
  night: Element | null;
}

export default class DailyTranslator implements Translator<Daily[]> {
  private forecastGroup: Element | null;
  private forecastIssueUNIXTime!: number;

  constructor(xmlDOM: Document) {
    this.forecastGroup = xmlDOM.getElementsByTagName('forecastGroup').item(0);
  }

  public translate(): Daily[] {
    const forecastIssueUNIXTime = this.getForecastIssueTime();

    if (!this.forecastGroup || !forecastIssueUNIXTime) {
      return [];
    }

    this.forecastIssueUNIXTime = forecastIssueUNIXTime;

    return this.getDayNightPairs().map((pair, index) => this.createDailyItem(this, pair, index));
  }

  private createDailyItem(that: DailyTranslator, dayNightPair: DayNightPair, index: number): Daily {
    return {
      time: that.createTimeForItem(index),
      daytimeConditions: that.createDaytimeConditionForItem(dayNightPair),
      nighttimeConditions: that.createNighttimeConditionForItem(dayNightPair)
    };
  }

  private createDaytimeConditionForItem(item: DayNightPair): HalfDayCondition | null {
    if (!item.day) {
      return null;
    }

    return {
      summaryExtended: this.createSummaryExtended(item.day),
      summaryClouds: this.createSummaryClouds(item.day),
      summary: this.createSummary(item.day),
      icon: this.createIcon(item.day),
      temperature: this.createTemperature(item.day),
      humidity: this.createHumidity(item.day),
      feelsLike: this.createFeelsLike(item.day),
      precipProbability: this.createPrecipProbability(item.day),
      wind: this.createWind(item.day)
    };
  }

  private createNighttimeConditionForItem(item: DayNightPair): HalfDayCondition | null {
    if (!item.night) {
      return null;
    }

    return {
      summaryExtended: this.createSummaryExtended(item.night),
      summaryClouds: this.createSummaryClouds(item.night),
      summary: this.createSummary(item.night),
      icon: this.createIcon(item.night),
      temperature: this.createTemperature(item.night),
      humidity: this.createHumidity(item.night),
      feelsLike: this.createFeelsLike(item.night),
      precipProbability: this.createPrecipProbability(item.night),
      wind: this.createWind(item.night)
    };
  }

  private createTimeForItem(index: number): number {
    const forecastIssue = moment(this.forecastIssueUNIXTime);
    const now = moment();
    const yesterday = now.subtract(1, 'day');

    const startsYesterday = forecastIssue.date() === yesterday.date();

    const startDate = startsYesterday ? yesterday.startOf('day') : now.startOf('day');

    return startDate.add(index, 'days').unix();
  }

  private createSummaryExtended(element: Element): string | null {
    const summaryExtended = element.getElementsByTagName('textSummary').item(0)?.textContent;
    return summaryExtended || null;
  }

  private createSummaryClouds(element: Element): string | null {
    const summaryClouds = element
      .getElementsByTagName('cloudPrecip')
      .item(0)
      ?.getElementsByTagName('textSummary')
      .item(0)?.textContent;

    return summaryClouds || null;
  }

  private createSummary(element: Element): string | null {
    const summary = element
      .getElementsByTagName('abbreviatedForecast')
      .item(0)
      ?.getElementsByTagName('textSummary')
      .item(0)?.textContent;

    return summary || null;
  }

  private createIcon(element: Element): number | null {
    const iconCode = element
      .getElementsByTagName('abbreviatedForecast')
      .item(0)
      ?.getElementsByTagName('iconCode')
      .item(0)?.textContent;

    return iconCode ? parseInt(iconCode) : null;
  }

  private createTemperature(element: Element): number | null {
    const temperature = element
      .getElementsByTagName('temperatures')
      .item(0)
      ?.getElementsByTagName('temperature')
      .item(0)?.textContent;

    return temperature ? parseFloat(temperature) : null;
  }

  private createHumidity(element: Element): number | null {
    const humidity = element?.getElementsByTagName('relativeHumidity').item(0)?.textContent;
    return humidity ? parseFloat(humidity) / 100 : null;
  }

  private createFeelsLike(element: Element): FeelsLike {
    const humidex = element
      .getElementsByTagName('humidex')
      .item(0)
      ?.getElementsByTagName('calculated')
      .item(0);

    const windChill = element
      .getElementsByTagName('windChill')
      .item(0)
      ?.getElementsByTagName('calculated')
      .item(0);

    let temperature: string | null = null;
    let type: FeelsLikeType | null = null;

    if (humidex && humidex.textContent?.length) {
      temperature = humidex.textContent;
      type = 'humidex';
    } else if (windChill && windChill?.textContent?.length) {
      temperature = windChill.textContent;
      type = 'windChill';
    }

    return {
      temperature: temperature ? parseFloat(temperature) : null,
      type
    };
  }

  private createPrecipProbability(element: Element): number | null {
    const precipProbability = element
      .getElementsByTagName('abbreviatedForecast')
      .item(0)
      ?.getElementsByTagName('pop')
      .item(0)?.textContent;

    return precipProbability ? parseFloat(precipProbability) / 100 : null;
  }

  private createWind(element: Element): Wind {
    const wind: Wind = {
      speed: null,
      gust: null,
      direction: null,
      bearing: null
    };

    const windElement = element
      .getElementsByTagName('winds')
      .item(0)
      ?.getElementsByTagName('wind')
      .item(0);

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

  private getForecastIssueTime(): number | null {
    const forecastIssueTimestamp = this.forecastGroup?.querySelector(
      "dateTime[name='forecastIssue'][zone='UTC']"
    )?.textContent;

    return forecastIssueTimestamp ? parseDateTimeAsUNIX(forecastIssueTimestamp) : null;
  }

  private getDayNightPairs(): DayNightPair[] {
    const forecastElements = this.forecastGroup?.getElementsByTagName('forecast');

    if (!forecastElements) {
      return [];
    }

    const forecasts = Array.from(forecastElements);

    const dayForecasts: Element[] = forecasts.filter(
      forecast => !this.getPeriodNameFromForecastElement(forecast)?.includes('night')
    );

    const nightForecasts: Element[] = forecasts.filter(forecast =>
      this.getPeriodNameFromForecastElement(forecast)?.includes('night')
    );

    const dayArrayIslonger = dayForecasts.length > nightForecasts.length;

    const longestArray = dayArrayIslonger ? dayForecasts : nightForecasts;
    const shortestArray = dayArrayIslonger ? nightForecasts : dayForecasts;

    return longestArray.map<DayNightPair>(forecast => {
      const currentDay = this.getDayOfWeekFromForecastElement(forecast);

      const matchingDayOrNight =
        shortestArray.find(forecast =>
          this.getDayOfWeekFromForecastElement(forecast)?.includes(currentDay || 'false')
        ) || null;

      return {
        day: dayArrayIslonger ? forecast : matchingDayOrNight,
        night: dayArrayIslonger ? matchingDayOrNight : forecast
      };
    });
  }

  private getDayOfWeekFromForecastElement(forecast: Element | null): string | null {
    const value = this.getPeriodNameFromForecastElement(forecast);

    if (!value) {
      return null;
    }

    return value.trim().split(' ')[0];
  }

  private getPeriodNameFromForecastElement(forecast: Element | null): string | null {
    return forecast?.getElementsByTagName('period').item(0)?.textContent || null;
  }
}
