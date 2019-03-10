import { gql } from 'apollo-server';

export default gql`
  enum WarningType {
    advisory
    warning
    watch
    ended
    statement
  }

  enum WarningPriority {
    urgent
    high
    medium
    low
  }

  type WarningEvent {
    dateTime(zone: String!): DateTime
    type: WarningType!
    description: String!
    priority: WarningPriority!
  }

  type Station {
    code: String!
    lat: String!
    lon: String!
    value: String
  }

  type IconCode {
    value: String
    format: String!
  }

  type Temperature {
    units: String!
    unitType: String!
    class: String
    year: String
    period: String
    value: String
  }

  type WindChill {
    textSummary: String
    calculated: [CalculatedWindChill!]!
  }

  type CalculatedWindChill {
    unitType: String!
    value: String
  }

  type Humidex {
    textSummary: String
    calculated: [CalculatedHumidex!]!
  }

  type CalculatedHumidex {
    unitType: String!
    value: String
  }

  type Pressure {
    units: String!
    unitType: String!
    change: String
    tendency: String
    value: String
  }

  type Visibility {
    units: String!
    unitType: String!
    value: String
  }

  type RelativeHumidity {
    units: String
    value: String
  }

  type Wind {
    speed: Speed!
    gust: Gust!
    direction: String!
    bearing: Bearing!

    index: String
    rank: String
  }

  type Bearing {
    units: String!
    value: String
  }

  type Speed {
    units: String!
    unitType: String!
    value: String
  }

  type Gust {
    unitType: String!
    units: String!
    value: String
  }

  type Direction {
    windDirFull: String!
    value: String
  }

  type HistoricPrecipitation {
    units: String!
    unitType: String!
    class: String
    year: String
    period: String
    value: String
  }

  type Pop {
    units: String!
    value: String
  }
`;
