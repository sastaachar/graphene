export function Lesser<T>(a: T, b: T): boolean {
  return a <= b;
}
export function Greater<T>(a: T, b: T): boolean {
  return a >= b;
}

export type Comparator<T> = (a: T, b: T) => boolean;

export default class PriorityQueue<T> {
  private pQueue: T[];
  private compare: Comparator<T>;

  private getPos(ele: T, left: number, right: number): number {
    while (left <= right) {
      if (left === right) {
        return this.compare(ele, this.pQueue[left]) ? left : left + 1;
      }
      const midPos = Math.floor((left + right) / 2);

      if (this.compare(ele, this.pQueue[midPos])) {
        right = midPos - 1;
      } else {
        left = midPos + 1;
      }
    }

    return 0;
  }

  constructor(compare: Comparator<T> = Lesser) {
    this.pQueue = [];
    this.compare = compare;
  }

  front(): T | undefined {
    if (this.pQueue.length === 0) return undefined;
    return this.pQueue[0];
  }

  pop(): T | undefined {
    // remove from front
    return this.pQueue.shift();
  }

  push(element: T) {
    const pos = this.getPos(element, 0, this.pQueue.length - 1);
    this.pQueue.splice(pos, 0, element);
  }

  empty(): boolean {
    return this.pQueue.length === 0;
  }
}
