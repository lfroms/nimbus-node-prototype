import { ensureArray } from '../helpers';
import moment from 'moment';

function itemIsNight(item: any) {
  return (
    item.period.value.toLowerCase().includes('night') ||
    item.period.value.toLowerCase().includes('nuit')
  );
}

export default function days(obj: any) {
  const { days } = obj;

  if (!days) {
    return null;
  }

  const firstItemIsNight = days[0] && itemIsNight(days[0]);
  const output: any[] = [];

  days.forEach((_day, index) => {
    if (index % 2 !== 0) {
      return;
    }

    let daytimeCondition: any = null;

    if (firstItemIsNight) {
      daytimeCondition = index === 0 ? null : days[index - 1];
    } else {
      daytimeCondition = days[index];
    }

    let nighttimeCondition: any = null;

    if (firstItemIsNight) {
      nighttimeCondition = days[index];
    } else {
      nighttimeCondition = index === days.length - 1 ? null : days[index + 1];
    }

    let condition = {
      time: moment()
        .startOf('day')
        .add(output.length, 'days')
        .unix(),
      dayCondition: null,
      nightCondition: null
    } as {
      time: number;
      dayCondition: any;
      nightCondition: any;
    };

    if (daytimeCondition !== null) {
      condition.dayCondition = {
        longSummary: daytimeCondition.textSummary,
        summary: daytimeCondition.cloudPrecip.textSummary,
        shortSummary: daytimeCondition.abbreviatedForecast.textSummary,
        iconCode: daytimeCondition.abbreviatedForecast.iconCode.value,
        precipProbability: daytimeCondition.abbreviatedForecast.pop.value,
        temperature: ensureArray(daytimeCondition.temperatures.temperature)[0].value,
        humidex: daytimeCondition.humidex ? daytimeCondition.humidex.calculated.value : null,
        windChill: daytimeCondition.windChill ? daytimeCondition.windChill.calculated.value : null,
        winds: daytimeCondition.winds,
        uv: daytimeCondition.uv
      };
    }

    if (nighttimeCondition !== null) {
      condition.nightCondition = {
        longSummary: nighttimeCondition.textSummary,
        summary: nighttimeCondition.cloudPrecip.textSummary,
        shortSummary: nighttimeCondition.abbreviatedForecast.textSummary,
        iconCode: nighttimeCondition.abbreviatedForecast.iconCode.value,
        precipProbability: nighttimeCondition.abbreviatedForecast.pop.value,
        temperature: ensureArray(nighttimeCondition.temperatures.temperature)[0].value,
        humidex: nighttimeCondition.humidex ? nighttimeCondition.humidex.calculated.value : null,
        windChill: nighttimeCondition.windChill
          ? nighttimeCondition.windChill.calculated.value
          : null,
        winds: nighttimeCondition.winds,
        uv: nighttimeCondition.uv
      };
    }

    output.push(condition);
  });

  return output;
}
