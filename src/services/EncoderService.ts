import { BaseEncoder } from './../encoders/BaseEncoder';

export class EncoderService {
  protected baseEncoder: BaseEncoder;

  constructor(baseEncoder: BaseEncoder) {
    this.baseEncoder = baseEncoder;
  }


  public decode(input: string): number[] {
    return this.baseEncoder.decode(input);
  }

  public encode(byteArr: number[]): string {
    return this.baseEncoder.encode(byteArr);
  }
}