import { stripAnsi } from '../index';

expect.addSnapshotSerializer(stripAnsi);

const name = {
  first: 'Alan',
  last: 'Turing',
};
const otherName = {
  first: 'Ada',
  last: 'Lovelace',
};

describe('ANSI codes should be removed', () => {
  test('if a test fails', () => {
    expect(() => expect(name).toEqual(otherName)).toThrowErrorMatchingInlineSnapshot(`
      expect(received).toEqual(expected) // deep equality

      - Expected  - 2
      + Received  + 2

        Object {
      -   "first": "Ada",
      -   "last": "Lovelace",
      +   "first": "Alan",
      +   "last": "Turing",
        }
    `);
  });
});
