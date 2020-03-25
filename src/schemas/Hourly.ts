import { gql } from 'apollo-server';
import { DataPoint } from './DataPoint';

export default gql`
  """
  Weather conditions forecasted by hour.
  """
  type Hourly implements DataPoint {
    time: Float!
    summary: String
    icon: Int
    temperature: Float
    feelsLike: FeelsLike!
    precipProbability: Float
    wind: Wind!
  }
`;

// Typescript Interfaces

export interface Hourly extends DataPoint {
  time: number;
}
