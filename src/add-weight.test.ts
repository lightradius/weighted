import { addWeight } from "./add-weight";
import {
  ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO,
  ALL_WEIGHTS_MUST_BE_NUMBERS,
  AT_LEAST_ONE_ITEM_IS_REQUIRED,
  ITEMS_MUST_BE_AN_ARRAY,
  WEIGHTS_CANNOT_BE_NAN,
} from "./errors";

describe("addWeight", () => {
  const DEFAULT_ITEMS = ["a", "b", "c"];

  it("should add the given weight to all items", () => {
    const weight = 2;

    const weightedItem = addWeight(DEFAULT_ITEMS, weight);

    expect(weightedItem).toEqual([
      { item: "a", weight: 2 },
      { item: "b", weight: 2 },
      { item: "c", weight: 2 },
    ]);
  });

  it("should throw an error if items is not an array", () => {
    const items = {} as [];

    expect(() => addWeight(items, 1)).toThrowError(ITEMS_MUST_BE_AN_ARRAY);
  });

  it("should throw an error if items is empty", () => {
    const items: [] = [];

    expect(() => addWeight(items, 1)).toThrowError(AT_LEAST_ONE_ITEM_IS_REQUIRED);
  });

  it("should throw an error if weight is not a number", () => {
    const weight = {} as number;

    expect(() => addWeight(DEFAULT_ITEMS, weight)).toThrowError(ALL_WEIGHTS_MUST_BE_NUMBERS);
  });

  it("should throw an error if weight is NaN", () => {
    const weight = NaN;

    expect(() => addWeight(DEFAULT_ITEMS, weight)).toThrowError(WEIGHTS_CANNOT_BE_NAN);
  });

  it("should throw an error if weight is less than or equal to 0", () => {
    const weight = 0;

    expect(() => addWeight(DEFAULT_ITEMS, weight)).toThrowError(ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO);
  });
});
