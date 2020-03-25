import { gql } from 'apollo-server';

export default gql`
  """
  Information about the location at which this weather data was recorded.
  """
  type Location {
    regionName: String
    stationName: String
    country: String!
    coordinate: Coordinate!
    distance: Float!
  }

  """
  A coordinate.
  """
  type Coordinate {
    latitude: Float!
    longitude: Float!
  }
`;

// Typescript Interfaces

export interface Location {
  regionName: string | null;
  stationName: string | null;
  country: string;
  coordinate: Coordinate;
  distance: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}
