import { assert, expect, test } from "vitest";

test("Math.sqrt()", async () => {
  assert.equal(Math.sqrt(4), 2);
  assert.equal(Math.sqrt(2), Math.SQRT2);
  expect(Math.sqrt(144)).toStrictEqual(12);
});
