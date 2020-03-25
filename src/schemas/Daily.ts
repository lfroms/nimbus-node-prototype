import { gql } from 'apollo-server';
import { DataPoint } from './DataPoint';

export default gql`
  """
  Weather conditions forecasted by day.
  """
  type Daily {
    time: Float!
    daytimeConditions: HalfDayCondition
    nighttimeConditions: HalfDayCondition
  }

  """
  Weather conditions forecasted for a particular part of the day.
  """
  type HalfDayCondition implements DataPoint {
    summaryExtended: String
    summaryClouds: String
    summary: String
    icon: Int
    temperature: Float
    feelsLike: FeelsLike!
    precipProbability: Float
    wind: Wind!
  }
`;

// Typescript Interfaces

export interface Daily {
  time: number;
  daytimeConditions: HalfDayCondition | null;
  nighttimeConditions: HalfDayCondition | null;
}

export interface HalfDayCondition extends DataPoint {
  summaryExtended: string | null;
  summaryClouds: string | null;
  precipProbability: number | null;
}
