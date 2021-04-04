export default class Stack<T> {
  private stack: T[];

  constructor() {
    this.stack = [];
    console.log('stack');
  }

  top(): T | undefined {
    if (this.stack.length === 0) return undefined;
    return this.stack[0];
  }

  pop(): T | undefined {
    // remove from front
    return this.stack.shift();
  }

  push(element: T) {
    // add at front
    this.stack.unshift(element);
  }

  empty(): boolean {
    return this.stack.length === 0;
  }
}
