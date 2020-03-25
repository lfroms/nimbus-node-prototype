import { gql } from 'apollo-server';

export default gql`
  """
  A collection of measurements.
  """
  interface DataPoint {
    summary: String
    icon: Int
    temperature: Float
    feelsLike: FeelsLike!
    wind: Wind!
  }

  """
  Description of the apparent temperature and its type.
  """
  type FeelsLike {
    temperature: Float
    type: FeelsLikeType
  }

  enum FeelsLikeType {
    humidex
    windChill
  }

  type Pressure {
    value: Float
    tendency: Tendency
    change: Float
  }

  enum Tendency {
    rising
    falling
    stable
  }

  type Wind {
    speed: Float
    gust: Float
    direction: String
    bearing: Float
  }
`;

// Typescript Interfaces

export interface DataPoint {
  summary: string | null;
  icon: number | null;
  temperature: number | null;
  feelsLike: FeelsLike;
  wind: Wind;
}

export interface FeelsLike {
  temperature: number | null;
  type: FeelsLikeType | null;
}

export type FeelsLikeType = 'humidex' | 'windChill';

export interface Wind {
  speed: number | null;
  gust: number | null;
  direction: string | null;
  bearing: number | null;
}

export interface Pressure {
  value: number | null;
  tendency: Tendency | null;
  change: number | null;
}

export type Tendency = 'rising' | 'falling' | 'stable';
