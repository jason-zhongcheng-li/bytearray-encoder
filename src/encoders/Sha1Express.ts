import { BaseEncoder } from './BaseEncoder';
const btoa = require('btoa');
const atob = require('atob');

export class Sha1Express {
  private encoderA: BaseEncoder;
  private encoderB: BaseEncoder;

  constructor(bases = { baseA: 36, baseB: 35 }) {
    this.encoderA = new BaseEncoder(bases.baseA);
    this.encoderB = new BaseEncoder(bases.baseB);
  }

  public async decode(str: string): Promise<string[]> {
    const val = btoa(str);
    const target = [];
    const len = val.length;
    for (let i = 0; i < len; i += 8) {
      target.push(val.slice(i, i + 8));
    }


    const resultA = target.map(obj => this.encoderA.decode(obj));

    const resultB = resultA.map(obj => this.encoderB.encode(obj));

    return resultB;
  }

  public async encode(str: string): Promise<string> {
    const val = str.split('-');

    const resultB = val.map(obj => this.encoderB.decode(obj));
    const resultA = resultB.map(obj => this.encoderA.encode(obj));

    return atob(resultA.join(''));
  }
}
