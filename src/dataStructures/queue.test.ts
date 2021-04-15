import { Queue } from './';

describe('Queue', () => {
  const q = new Queue();
  const data = [1, 2, 3, 4, 5, 6];

  test('Should be empty', () => {
    expect(q.front()).toBeUndefined();
  });

  test('FIFO', () => {
    data.forEach((element) => {
      q.push(element);
    });

    expect(q.front()).toBe(1);
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
