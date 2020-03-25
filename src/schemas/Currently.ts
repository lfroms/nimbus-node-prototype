import { gql } from 'apollo-server';
import { DataPoint, Pressure } from './DataPoint';

export default gql`
  """
  Currently observed weather conditions.
  """
  type Currently implements DataPoint {
    time: Float!
    summary: String
    icon: Int
    temperature: Float
    feelsLike: FeelsLike!
    precipProbability: Float
    wind: Wind!
    sunriseTime: Float
    sunsetTime: Float
    dewPoint: Float
    humidity: Float
    pressure: Pressure!
    visibility: Float
    uvIndex: Int
  }
`;

// Typescript Interfaces

export interface Currently extends DataPoint {
  time: number;
  sunriseTime?: number;
  sunsetTime?: number;
  dewPoint?: number;
  humidity?: number;
  pressure: Pressure;
  visibility?: number;
  uvIndex?: number;
}
