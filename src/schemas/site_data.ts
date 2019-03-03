import { gql } from 'apollo-server';

export default gql`
  type Temperature {
    unitType: String!
    units: String!
    class: String!
    value: String
    year: String
    period: String
  }

  type Precip {
    unitType: String!
    units: String!
    value: String!
  }

  type YesterdayConditions {
    temperature: [Temperature!]!
    precip: Precip!
  }

  type Country {
    code: String!
    value: String!
  }

  type Province {
    code: String!
    value: String!
  }

  type Name {
    lat: String!
    lon: String!
    value: String!
    code: String!
  }

  type Location {
    region: String!
    continent: String!
    country: Country!
    province: Province!
    name: Name!
  }

  type Day {
    value: String!
    name: String!
  }

  type Month {
    name: String!
    value: String!
  }

  type DateTime {
    zone: String!
    UTCOffset: String!
    day: Day!
    hour: String!
    name: String!
    year: String!
    minute: String!
    timeStamp: String!
    textSummary: String!
    month: Month!
  }

  type RiseSet {
    disclaimer: String!
    dateTime(zone: String!): DateTime
  }

  type CloudPrecip {
    textSummary: String!
  }

  type IconCode {
    value: String
    format: String!
  }

  type Pop {
    units: String!
    value: String
  }

  type AbbreviatedForecast {
    iconCode: IconCode
    pop: Pop
    textSummary: String
  }

  type Temperatures {
    temperature: Temperature
    textSummary: String!
  }

  type Bearing {
    value: String!
    units: String!
  }

  type Speed {
    units: String!
    value: String!
    unitType: String!
  }

  type Gust {
    value: String!
    unitType: String!
    units: String!
  }

  type Wind {
    direction: String!
    bearing: Bearing!
    index: String
    rank: String!
    speed: Speed!
    gust: Gust!
  }

  type Winds {
    wind: [Wind!]!
    textSummary: String!
  }

  type AccumulationAmount {
    unitType: String!
    units: String!
    value: String!
  }

  type Accumulation {
    name: String!
    amount: AccumulationAmount!
  }

  type PrecipType {
    start: String!
    end: String!
    value: String!
  }

  type Precipitation {
    accumulation: Accumulation!
    textSummary: String!
    precipType: PrecipType!
  }

  type RelativeHumidity {
    value: String!
    units: String!
  }

  type Period {
    textForecastName: String!
    value: String!
  }

  type Forecast {
    textSummary: String!
    cloudPrecip: CloudPrecip!
    abbreviatedForecast: AbbreviatedForecast!
    temperatures: Temperatures!
    winds: Winds!
    precipitation: Precipitation!
    relativeHumidity: RelativeHumidity!
    period: Period!
  }

  type RegionalNormals {
    textSummary: String
    temperature: [Temperature!]
  }

  type ForecastGroup {
    forecast: [Forecast!]!
    dateTime(zone: String!): DateTime
    regionalNormals: RegionalNormals!
  }

  type Lop {
    category: String!
    units: String!
    value: String!
  }

  type WindChill {
    unitType: String!
    value: String!
  }

  type Humidex {
    unitType: String!
    value: String!
  }

  type Direction {
    windDirFull: String!
    value: String!
  }

  type HourlyForecast {
    dateTimeUTC: String!
    condition: String!
    iconCode: IconCode!
    temperature: Temperature!
    lop: Lop!
    windChill: WindChill!
    humidex: Humidex!
    wind: Wind!
  }

  type HourlyForecastGroup {
    hourlyForecast: [HourlyForecast!]
    dateTime(zone: String!): DateTime
  }

  type Pressure {
    tendency: String!
    value: String
    unitType: String!
    units: String!
    change: String!
  }

  type Station {
    code: String!
    lat: String!
    lon: String!
    value: String!
  }

  type Visibility {
    units: String!
    value: String
    unitType: String!
  }

  type CurrentConditions {
    iconCode: IconCode
    dewpoint: Temperature
    pressure: Pressure
    station: Station
    dateTime(zone: String!): DateTime
    visibility: Visibility
    relativeHumidity: RelativeHumidity
    wind: Wind
    condition: String
    temperature: Temperature
    windChill: WindChill
    humidex: Humidex
  }

  type WarningEvent {
    type: String!
    priority: String!
    description: String!
    dateTime: String!
  }

  type Warnings {
    events: [WarningEvent!]
    url: String
  }

  type Almanac {
    temperature: [Temperature!]
    precipitation: [Precip!]
    pop: Lop
  }

  type SiteData {
    yesterdayConditions: YesterdayConditions!
    location: Location!
    warnings: Warnings!
    almanac: Almanac!
    riseSet: RiseSet!
    dateTime(zone: String!): DateTime
    forecastGroup: ForecastGroup!
    hourlyForecastGroup: HourlyForecastGroup!
    license: [String]!
    currentConditions: CurrentConditions!
  }
`;
