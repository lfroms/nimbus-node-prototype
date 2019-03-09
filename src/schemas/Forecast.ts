import { gql } from 'apollo-server';

export default gql`
  type Forecast {
    period: Period!
    textSummary: String!
    cloudPrecip: CloudPrecip!
    abbreviatedForecast: AbbreviatedForecast!
    temperatures: Temperatures!
    winds: Winds!
    precipitation: Precipitation!
    snowLevel: SnowLevel
    windChill: WindChill
    uv: UV
    relativeHumidity: RelativeHumidity
  }

  type CloudPrecip {
    textSummary: String!
  }

  type AbbreviatedForecast {
    iconCode: IconCode
    pop: Pop
    textSummary: String
  }

  type Period {
    textForecastName: String!
    value: String
  }

  type RegionalNormals {
    textSummary: String
    temperature: [Temperature!]!
  }

  type HourlyForecast {
    condition: String!
    iconCode: IconCode!
    temperature: Temperature!
    lop: Lop!
    windChill: WindChill!
    humidex: Humidex!
    wind: WindHourly!

    dateTimeUTC: String!
  }

  type Lop {
    category: String!
    units: String!
    value: String
  }

  type Precipitation {
    accumulation: [Accumulation!]!
    textSummary: String
    precipType: PrecipType
  }

  type Accumulation {
    name: String!
    amount: AccumulationAmount!
  }

  type AccumulationAmount {
    unitType: String!
    units: String!
    value: String
  }

  type PrecipType {
    start: String
    end: String
    value: String
  }

  type UV {
    index: String
    textSummary: String
  }

  type SnowLevel {
    textSummary: String!
  }

  type Temperatures {
    temperature: [Temperature!]!
    textSummary: String
  }

  type Winds {
    wind: [Wind!]!
    textSummary: String
  }

  type WindHourly {
    speed: Speed!
    gust: Gust!
    direction: Direction!
  }
`;
