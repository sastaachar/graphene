import { PriorityQueue } from './';

describe('Priority Queue', () => {
  const q = new PriorityQueue();
  const data = [6, 2, 1, 3, 4, 5, 7, 10, 6, 2, 4];

  test('Should be empty', () => {
    expect(q.front()).toBeUndefined();
  });

  test('Should give min element', () => {
    let curMin = data[0];

    data.forEach((element) => {
      // min ele should always be at top
      if (element < curMin) curMin = element;
      q.push(element);
      expect(q.front()).toBe(curMin);
    });
  });

  test('pop should remove and return', () => {
    const frontE = q.front();
    const popped = q.pop();
    expect(frontE).toEqual(popped);
  });

  test('should not be empty', () => {
    expect(q.empty()).toBe(false);
  });

  test('empty should pop undefined', () => {
    while (!q.empty()) {
      q.pop();
    }
    expect(q.pop()).toBeUndefined();
  });

  test('should be empty', () => {
    expect(q.empty()).toBe(true);
  });
});
