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
  TodaySchema
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

  type Query {
    """
    Get weather information given one or more coordinates.
    """
    weather(coordinates: [CoordinateInput!]!, language: Language = english): [Weather]
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
  coordinates: Coordinate[];
  language?: Language;
}

export enum Language {
  english = 'e',
  french = 'f'
}
