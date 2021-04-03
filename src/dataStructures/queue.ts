export default class Queue<T> {
  private queue: T[];

  constructor() {
    this.queue = [];
  }

  front(): T | undefined {
    if (this.queue.length === 0) return undefined;
    return this.queue[0];
  }

  pop(): T | undefined {
    return this.queue.shift();
  }

  push(element: T) {
    this.queue.push(element);
  }

  empty(): boolean {
    return this.queue.length === 0;
  }
}
