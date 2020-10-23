export default class ArrayRemover {
  key = new Set<number>();

  mark = (index: number) => {
    this.key.add(index);
  };

  splice = <T = any>(arr: T[]): void => {
    const ids = [...this.key].sort().reverse();
    ids.forEach((index) => {
      arr.splice(index, 1);
    });
  };

  filter = <T = any>(arr: T[]): T[] => {
    return arr.filter((_, index) => {
      return !this.key.has(index);
    });
  };
}
