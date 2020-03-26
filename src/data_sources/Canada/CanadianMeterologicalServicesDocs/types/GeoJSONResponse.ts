export default interface GeoJSONResponse {
  type: string;
  features: {
    type: string;
    properties: {
      Codes: string;
      'English Names': string;
      'Province Codes': string;
      Latitude: number;
      Longitude: number;
    };
    geometry: {
      type: string;
      coordinates: number[];
    };
  }[];
}
