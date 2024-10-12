import { calculateSum } from './calculations';

test('calculates the sum of two numbers', () => {
  expect(calculateSum(1, 2)).toBe(3);
  expect(calculateSum(-1, 1)).toBe(0);
});