import { gql } from 'apollo-server';

export default gql`
  """
  Relevant information to today.
  """
  type Today {
    highTemperature: Float
    lowTemperature: Float
    sunriseTime: Float
    sunsetTime: Float
  }
`;

// Typescript Interfaces

export interface Today {
  highTemperature: number | null;
  lowTemperature: number | null;
  sunriseTime: number | null;
  sunsetTime: number | null;
}
