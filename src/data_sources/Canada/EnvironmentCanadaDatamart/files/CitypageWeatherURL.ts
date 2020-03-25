import CitypageWeatherFilename from './CitypageWeatherFilename';

export default class CitypageWeatherURL {
  private region: string;
  private filename: CitypageWeatherFilename;

  constructor(region: string, filename: CitypageWeatherFilename) {
    this.region = region;
    this.filename = filename;
  }

  public toString(): string {
    return `${this.region}/${this.filename.toString()}`;
  }
}
