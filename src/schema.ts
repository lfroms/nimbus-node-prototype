import { gql } from 'apollo-server';
import { default as siteData } from './schemas/site_data';

export default gql`
  ${siteData}

  """
  A two or three character province code.
  """
  enum Area {
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

  type Query {
    """
    Get weather information for a given station.
    """
    site(area: Area!, code: Int!, language: Language = e): SiteData
  }
`;
