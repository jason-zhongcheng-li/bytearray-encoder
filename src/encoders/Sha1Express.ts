import { Base36 } from './Base36';
import { Base16 } from './Base16';
import { Base64 } from './Base64';
import { EncoderService } from './../services/EncoderService';
import StringUtil from '../util/StringUtil';

export class Sha1Express {
  private hexService: EncoderService;
  private base36Encoder: EncoderService;
  private unit: number;

  constructor(unit: number) {
    this.base36Encoder = new EncoderService(new Base36());
    this.hexService = new EncoderService(new Base16());
    this.unit = unit;
  }

  public decode(sha1: string): string[] {
    const str = StringUtil.splitString(sha1, this.unit);
    const base36 = str.map(val => this.hexService.decode(val));
    const result = base36.map(val => this.base36Encoder.encode(val));
    return result;
  }

  public encode(str: string[]): string {
    const hexDec = str.map(val => this.base36Encoder.decode(val));
    const result = hexDec.map(val => this.hexService.encode(val));
    return result.join('');
  }
}
