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
    precipProbability: Float
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
  summary?: string;
  icon?: number;
  temperature?: number;
  feelsLike: FeelsLike;
  precipProbability?: number;
  wind: Wind;
}

export interface FeelsLike {
  temperature?: number;
  type: FeelsLikeType;
}

export type FeelsLikeType = 'humidex' | 'windChill';

export interface Wind {
  speed?: number;
  gust?: number;
  direction?: string;
  bearing?: number;
}

export interface Pressure {
  value?: number;
  tendency?: Tendency;
  change?: number;
}

export type Tendency = 'rising' | 'falling' | 'stable';
