import { gql } from 'apollo-server';
import { default as siteData } from './schemas/site_data';

export default gql`
  ${siteData}

  type Query {
    """
    Get some site data.
    """
    siteData(code: Int!): SiteData!
  }
`;
