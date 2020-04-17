import { Translator } from '..';
import { RadarTimestamps } from 'schemas';

export default class RainviewerTranslator implements Translator<RadarTimestamps> {
  private jsonString: string;

  constructor(jsonString: string) {
    this.jsonString = jsonString;
  }

  public translate(): RadarTimestamps {
    return JSON.parse(this.jsonString);
  }
}
