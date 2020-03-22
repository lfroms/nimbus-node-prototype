import { gql } from 'apollo-server';

export default gql`
  """
  Forecast daytime and nighttime conditions for a particular day.
  """
  type Day {
    time: Int!
    dayCondition: ForecastCondition
    nightCondition: ForecastCondition
  }

  """
  Forecasted conditions for a particular day.
  """
  type ForecastCondition {
    longSummary: String!
    summary: String!
    shortSummary: String!
    iconCode: Int!
    precipProbability: Int
    temperature: Float!
    humidex: Float
    windChill: Float
    winds: [Wind!]!
    uv: UV
  }

  """
  Forecasted conditions for a particular hour in the future.
  """
  type Hour {
    time: Int!
    summary: String!
    iconCode: Int!
    precipProbability: String!
    temperature: Float!
    humidex: Float
    windChill: Float
    wind: Wind
  }
`;
