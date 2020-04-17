import { gql } from 'apollo-server';

export default gql`
  """
  The provider to be used to retrieve radar timestamps.
  """
  enum RadarProvider {
    msc
    rainviewer
  }
`;

export enum RadarProvider {
  msc = 'msc',
  rainviewer = 'rainviewer',
}

export type RadarTimestamps = number[];
