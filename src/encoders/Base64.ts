import { BaseEncoder } from './BaseEncoder';
import btoa = require('btoa');
import atob = require('atob');

export class Base64 extends BaseEncoder {
  constructor() {
    super(64);
  }

  // type BufferEncoding = "ascii" | "utf8" | "utf16le" | "ucs2" | "base64" | "latin1" | "binary" | "hex";

  protected baseDecode(input: string): number[] {
    const str = atob(input);
    const num = parseInt(str, 10);
    return super.toByteArray(num);
  }

  protected baseEncode(input: number[]): string {
    const base10 = super.fromByteArray(input);
    const base64 = btoa(base10.toString(10));
    return base64;
  }
}