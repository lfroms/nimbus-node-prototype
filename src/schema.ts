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
    site(region: Region!, code: Int!, language: Language = e): SiteData
  }
`;
