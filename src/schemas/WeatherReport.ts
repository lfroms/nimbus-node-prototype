import { gql } from 'apollo-server';

export default gql`
  """
  All weather data reported at a given site.
  """
  type WeatherReport {
    location: Location!
    currentConditions: CurrentConditions
    warnings: Warnings
    normals: Normals
    dailyForecast: DailyForecast
    hourlyForecast: HourlyForecast
    sun: Sun
    yesterday: Yesterday
  }

  """
  Describes the location of a site.
  """
  type Location {
    weatherFor: String!
    country: String!
    province: String!
    region: String!
  }

  type CurrentConditions {
    time: Int!
    station: Station!
    temperature: Float
    humidity: Int
    pressure: Float
    windChill: Float
    humidex: Float
    wind: Wind
    visibility: Float
    dewPoint: Float
    iconCode: Int
    summary: String
  }

  type Warnings {
    url: String!
    events: [Event!]!
  }

  """
  Temperature conditions that are normally observed at a given site.
  """
  type Normals {
    high: Float
    low: Float
  }

  type DailyForecast {
    time: Int
    summary: String
    days: [Day!]
  }

  type HourlyForecast {
    time: Int!
    hours: [Hour!]
  }

  """
  Time at which the sun rises or sets in the region.
  """
  type Sun {
    riseTime: Int!
    setTime: Int!
  }

  """
  Overview of the conditions observed at a given site yesterday.
  """
  type Yesterday {
    high: Float
    low: Float
    precip: String
  }
`;
