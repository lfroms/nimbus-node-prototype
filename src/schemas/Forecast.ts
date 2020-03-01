import { gql } from 'apollo-server';

export default gql`
  """
  Forecasted conditions for a particular day in the future.
  """
  type Day {
    when: String!
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
