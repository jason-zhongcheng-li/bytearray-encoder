import { BaseEncoder } from './BaseEncoder';
import btoa = require('btoa');
import atob = require('atob');

export class Base64 extends BaseEncoder {
  constructor() {
    super(64);
  }

  // Override super function
  protected baseDecode(input: string): number[] {
    const str = atob(input);
    const num = parseInt(str, 10);
    return super.toByteArray(num);
  }

  // Override super function
  protected baseEncode(input: number[]): string {
    const base10 = super.fromByteArray(input);
    const base64 = btoa(base10.toString(10));
    return base64;
  }
}