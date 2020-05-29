import { EncoderService } from './../services/EncoderService';
import { BaseEncoder } from './BaseEncoder';
import StringUtil from '../util/StringUtil';

export class Sha1Express {
  private hexaService: EncoderService;
  private service: EncoderService;
  private unit: number;

  constructor(base: number, unit: number) {
    this.service = new EncoderService(new BaseEncoder(base));
    this.hexaService = new EncoderService(new BaseEncoder(16));
    this.unit = unit;
  }

  public decode(sha1: string): string[] {
    const str = StringUtil.splitString(sha1, this.unit);
    const hexaDec = str.map(val => this.hexaService.decode(val));
    const result = hexaDec.map(val => this.service.encode(val));
    return result;
  }

  public encode(str: string[]): string {
    const hexaDec = str.map(val => this.service.decode(val));
    const result = hexaDec.map(val => this.hexaService.encode(val));

    return result.join('');

  }
}
