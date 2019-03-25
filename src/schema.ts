import { gql } from 'apollo-server';
import { SiteData, General, Weather, Forecast } from './schemas';

export default gql`
  ${General}
  ${SiteData}
  ${Weather}
  ${Forecast}

  type Query {
    """
    Get weather information for a given station.
    """
    weather(region: Region!, code: Int!, language: Language = e): SiteData

    """
    Search for a site given a keyword.
    """
    site(keyword: String!): [Site!]

    """
    Retrieve the entire site list.
    """
    sites(language: Language = e): [Site!]
  }
`;
