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
    Retrieve the entire site list or search by coordinates.
    """
    sites(
      language: Language = e
      latitude: Float
      longitude: Float
      limit: Int
    ): [Site!]
  }
`;
