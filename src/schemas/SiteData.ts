import { gql } from 'apollo-server';

export default gql`
  """
  All weather data for a given site.
  """
  type SiteData {
    license: String!
    dateTime(zone: String!): DateTime
    location: Location!
    warnings: Warnings!
    currentConditions: CurrentConditions!
    forecastGroup: ForecastGroup!
    hourlyForecastGroup: HourlyForecastGroup
    yesterdayConditions: YesterdayConditions!
    riseSet: RiseSet!
    almanac: Almanac!
  }

  type DateTime {
    year: String
    month: Month
    day: Day
    hour: String
    minute: String
    timeStamp: String
    textSummary: String

    name: String!
    zone: String!
    UTCOffset: String!
  }

  type Location {
    continent: String!
    country: Country!
    province: Province!
    name: Name!
    region: String
  }

  type Warnings {
    events: [WarningEvent!]
    url: String
  }

  type CurrentConditions {
    station: Station
    dateTime(zone: String!): DateTime
    condition: String
    iconCode: IconCode
    temperature: Temperature
    dewpoint: Temperature
    windChill: CalculatedWindChill
    humidex: CalculatedHumidex
    pressure: Pressure
    visibility: Visibility
    relativeHumidity: RelativeHumidity
    wind: Wind
  }

  """
  A group of daily forecasts.
  """
  type ForecastGroup {
    dateTime(zone: String!): DateTime
    regionalNormals: RegionalNormals!
    forecast: [Forecast!]!
  }

  """
  A group of hourly forecasts.
  """
  type HourlyForecastGroup {
    dateTime(zone: String!): DateTime
    hourlyForecast: [HourlyForecast!]!
  }

  type YesterdayConditions {
    temperature: [Temperature!]!
    precip: [HistoricPrecipitation!]!
  }

  """
  Sunrise and sunset information.
  """
  type RiseSet {
    disclaimer: String
    dateTime(zone: String!): DateTime
  }

  """
  Historical weather data.
  """
  type Almanac {
    temperature: [Temperature!]!
    precipitation: [HistoricPrecipitation!]!
    pop: Pop
  }
`;
