import { Language } from '../../../../schema';

export default class CitypageWeatherFilename {
  private siteCode: number;
  private language: Language;

  constructor(siteCode: number, language: Language) {
    this.siteCode = siteCode;
    this.language = language;
  }

  public toString(): string {
    return this.createFilename(this.siteCode, this.language);
  }

  private createStringForSiteCode(siteCode: number): string {
    return siteCode.toString().padStart(7, '0');
  }

  private createFilename(siteCode: number, language: string): string {
    const siteCodeString = this.createStringForSiteCode(siteCode);
    return `s${siteCodeString}_${language}.xml`;
  }
}
