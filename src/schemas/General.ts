import { gql } from 'apollo-server';

export default gql`
  """
  Weather station (site) metadata.
  """
  type Site {
    nameEn: String!
    nameFr: String!
    code: Int!
    provinceCode: String!
  }

  """
  A two or three character province code.
  """
  enum Region {
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

  type Month {
    name: String!
    value: String!
  }

  type Day {
    value: String!
    name: String!
  }

  type Country {
    code: String!
    value: String!
  }

  type Province {
    code: String!
    value: String!
  }

  type Name {
    code: String!
    lat: String!
    lon: String!
    value: String!
  }
`;
