import { gql } from 'apollo-server';
import {
  AlertSchema,
  CurrentlySchema,
  DailySchema,
  DataPointSchema,
  HourlySchema,
  LocationSchema,
  WeatherSchema,
  Coordinate,
  TodaySchema,
  RadarProvider,
  RadarSchema,
} from './schemas';

export default gql`
  ${AlertSchema}
  ${CurrentlySchema}
  ${DailySchema}
  ${DataPointSchema}
  ${HourlySchema}
  ${LocationSchema}
  ${TodaySchema}
  ${WeatherSchema}
  ${RadarSchema}

  type Query {
    """
    Get weather information given a coordinate.
    """
    weather(coordinate: CoordinateInput, language: Language = english): Weather

    """
    Get weather information given one or more coordinates.
    """
    bulkWeather(coordinates: [CoordinateInput!]!, language: Language = english): [Weather]!

    """
    Get radar timestamps given a provider.
    """
    radarTimestamps(provider: RadarProvider!): [Float!]!
  }

  enum Language {
    english
    french
  }

  input CoordinateInput {
    latitude: Float!
    longitude: Float!
  }
`;

// Typescript Interfaces

export interface WeatherQueryArgs {
  coordinate?: Coordinate;
  language?: Language;
}

export interface BulkWeatherQueryArgs {
  coordinates: Coordinate[];
  language?: Language;
}

export interface RadarTimestampsQueryArgs {
  provider: RadarProvider;
}

export enum Language {
  english = 'e',
  french = 'f',
}
