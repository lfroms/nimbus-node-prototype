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
    wind: Wind!
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
  dewPoint: number | null;
  humidity: number | null;
  pressure: Pressure;
  visibility: number | null;
  uvIndex: number | null;
}
