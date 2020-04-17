export default interface RadarTimestampDataSource {
  getData(): Promise<string>;
}
