import { BaseEncoder } from './BaseEncoder';

export class BufferHex extends BaseEncoder {
  constructor() {
    super(64);
  }

  protected baseDecode(input: string): number[] {
    const base64 = Buffer.from(input, 'hex').toString();
    const num = parseInt(base64, 10);
    return super.toByteArray(num);
  }

  protected baseEncode(input: number[]): string {
    const base10 = super.fromByteArray(input);
    const base64 = Buffer.from(base10.toString(), 'binary').toString('hex');
    return base64;
  }
}