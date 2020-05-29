export default class StringUtil {
  public static splitString(str: string, unit: number): string[] {
    const result = [] as string[];
    const arr = str.split('');
    const group = Math.ceil(str.length / unit);

    for (let i = 0; i < group; i++) {
      const piece = arr.slice(unit * i, unit * (i + 1));
      result.push(piece.join(''));
    }

    return result;
  }
}