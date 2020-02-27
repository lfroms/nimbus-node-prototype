import { gql } from 'apollo-server';
import { WeatherReport, General, Weather, Forecast } from './schemas';

export default gql`
  ${General}
  ${WeatherReport}
  ${Weather}
  ${Forecast}

  type Query {
    """
    Get weather information for a given station.
    """
    weather(
      province: Province!
      siteCode: Int!
      units: Units!
      language: Language = e
    ): WeatherReport

    """
    Get weather information for a station closest to given coordinates.
    """
    weatherByCoordinate(
      coordinate: Coordinate!
      units: Units!
      language: Language = e
    ): WeatherReport

    """
    Get weather information for multiple weather stations by list of coordinates.
    """
    bulkWeatherByCoordinates(
      coordinates: [Coordinate!]!
      units: Units!
      language: Language = e
    ): [WeatherReport]!

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
