export class BaseEncoder {
  protected base: number;

  constructor(base: number) {
    this.base = base;
  }

  public getBase(): number {
    return this.base;
  }

  public decode(input: string): number[] {
    return this.baseDecode(input);
  }

  public encode(byteArray: number[]): string {
    return this.baseEncode(byteArray);
  }

  protected baseDecode(input: string): number[] {
    const base10 = parseInt(input, this.base);
    // console.log('base10 = ', base10);
    return this.toByteArray(base10);
  }

  protected baseEncode(input: number[]): string {
    const base10 = this.fromByteArray(input);
    return base10.toString(this.base);
  }

  protected toByteArray(input: number): number[] {
    const byteArray = [];
    let range = this.base;
    while (range > 0) {
      byteArray.push(0);
      range--;
    }

    for (var index = 0; index < byteArray.length; index++) {
      const byte = input & 0xff;
      byteArray[index] = byte;
      // console.log('byte = ', byte);
      input = (input - byte) / 256;
    }

    // console.log('byteArray = ', byteArray);

    return byteArray.filter(num => num !== 0).reverse();
  }

  protected fromByteArray(byteArray: number[]): number {
    let value = 0;
    byteArray = byteArray.reverse();
    for (let i = byteArray.length - 1; i >= 0; i--) {
      value = (value * 256) + byteArray[i];
    }
    return value;
  }
}