import { Language } from 'schema';

export default class CitypageWeatherFilename {
  private siteCode: string;
  private language: Language;

  constructor(siteCode: string, language: Language) {
    this.siteCode = siteCode;
    this.language = language;
  }

  public toString(): string {
    return this.createFilename(this.siteCode, this.language);
  }

  private createFilename(siteCode: string, language: string): string {
    return `${siteCode}_${language}.xml`;
  }
}
