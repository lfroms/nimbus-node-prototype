import { gql } from 'apollo-server';

export default gql`
  """
  A public weather alert.
  """
  type Alert {
    title: String!
    time: Float!
    type: AlertType!
    uri: String!
  }

  """
  Type of weather alert.
  """
  enum AlertType {
    advisory
    warning
    watch
    ended
    statement
  }
`;

// Typescript Interfaces

export interface Alert {
  title: string;
  time: number;
  type: AlertType;
  uri: string;
}

export type AlertType = 'advisory' | 'warning' | 'watch' | 'ended' | 'statement';
