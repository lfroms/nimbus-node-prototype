import { gql } from 'apollo-server';

export default gql`
  """
  Information about the location at which this weather data was recorded.
  """
  type Location {
    siteName: String
    city: String!
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
  siteName?: string;
  city: string;
  country: string;
  coordinate: Coordinate;
  distance: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}
