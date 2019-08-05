import { gql } from 'apollo-server';

export default gql`
  type UV {
    index: Int!
    levelDescription: String!
  }

  type Wind {
    direction: String
    speed: String!
    gust: Int
    bearing: Float
  }

  """
  A particular warning.
  """
  type Event {
    time: Int!
    summary: String!
    type: WarningType!
    priority: WarningPriority!
  }

  enum WarningType {
    advisory
    warning
    watch
    ended
    statement
  }

  enum WarningPriority {
    urgent
    high
    medium
    low
  }

  """
  Exact location of a specific weather station.
  """
  type Station {
    name: String!
    code: String!
    latitude: String!
    longitude: String!
  }
`;
