import { isValidCoord } from '../rover/position';

describe("test isValidCoord", () => {
  it("should return true for 5 5", () => {
    expect(isValidCoord("5 5")).toBe(true);
  })
})
