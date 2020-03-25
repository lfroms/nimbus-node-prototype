import { gql } from 'apollo-server';
import {
  AlertSchema,
  CurrentlySchema,
  DailySchema,
  DataPointSchema,
  HourlySchema,
  LocationSchema,
  WeatherSchema,
  Coordinate
} from './schemas';

export default gql`
  ${AlertSchema}
  ${CurrentlySchema}
  ${DailySchema}
  ${DataPointSchema}
  ${HourlySchema}
  ${LocationSchema}
  ${WeatherSchema}

  type Query {
    """
    Get weather information for a given a coordinate.
    """
    weather(coordinate: CoordinateInput!, language: Language = english): Weather

    """
    Get multiple sets of weather information given a list of coordinates.
    """
    bulkWeather(coordinates: [CoordinateInput!]!, language: Language = english): [Weather]!
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
  coordinate: Coordinate;
  language?: Language;
}

export interface BulkWeatherQueryArgs {
  coordinates: Coordinate[];
  language?: Language;
}

export enum Language {
  english = 'e',
  french = 'f'
}
