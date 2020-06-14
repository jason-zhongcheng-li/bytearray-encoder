export class BaseEncoder {
  protected base: number;

  // Constructor with parameter to create corresponding decoder of base code
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
    // Convert string from whatever base to Decimal int
    const base10 = parseInt(input, this.base);

    // Convert decimal string to byte array
    return this.toByteArray(base10);
  }

  protected baseEncode(input: number[]): string {
    // Convert byte array decimal number
    const base10 = this.fromByteArray(input);

    // Convert decimal number to input base string
    return base10.toString(this.base);
  }


  // Only sub class can access this protected function
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
      input = (input - byte) / 256;
    }

    return byteArray.filter(num => num !== 0).reverse();
  }

  // Only sub class can access this protected function
  protected fromByteArray(byteArray: number[]): number {
    let value = 0;
    byteArray = byteArray.reverse();
    for (let i = byteArray.length - 1; i >= 0; i--) {
      value = (value * 256) + byteArray[i];
    }
    return value;
  }
}