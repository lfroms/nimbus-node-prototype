import { gql } from 'apollo-server';
import { Currently } from './Currently';
import { Hourly } from './Hourly';
import { Daily } from './Daily';
import { Alert } from './Alert';
import { Location } from './Location';
import { Today } from './Today';

export default gql`
  """
  Weather for a given location.
  """
  type Weather {
    location: Location!
    today: Today!
    currently: Currently!
    hourly: [Hourly!]!
    daily: [Daily!]!
    alerts: [Alert!]!
  }
`;

// Typescript Interfaces

export interface Weather {
  location: Location;
  today: Today;
  currently: Currently;
  hourly: Hourly[];
  daily: Daily[];
  alerts: Alert[];
}
