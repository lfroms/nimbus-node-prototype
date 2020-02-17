import { gql } from 'apollo-server';

export default gql`
  """
  Weather station (site) metadata.
  """
  type Site {
    code: Int!
    name: String!
    province: Province!
    latitude: Float
    longitude: Float
  }

  """
  Coordinates.
  """
  input Coordinate {
    latitude: Float
    longitude: Float
  }

  """
  A two or three character province code.
  """
  enum Province {
    AB
    BC
    HEF
    MB
    NB
    NL
    NS
    NT
    NU
    ON
    PE
    QC
    SK
    YT
  }

  enum Language {
    e
    f
  }

  enum Units {
    imperial
    metric
  }
`;
