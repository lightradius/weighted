import { addWeights } from "./add-weights";
import {
  ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO,
  ALL_WEIGHTS_MUST_BE_NUMBERS,
  AT_LEAST_ONE_ITEM_IS_REQUIRED,
  AT_LEAST_ONE_WEIGHT_IS_REQUIRED,
  ITEMS_MUST_BE_AN_ARRAY,
  THE_NUMBER_OF_WEIGHTS_MUST_MATCH_THE_NUMBER_OF_ITEMS,
  WEIGHTS_MUST_BE_AN_ARRAY,
} from "./errors";

describe("addWeights", () => {
  it("should add the default weight (1) to all items if no weights are provided", () => {
    const items = ["a", "b", "c"];

    const weightedItem = addWeights(items);

    expect(weightedItem).toEqual([
      { item: "a", weight: 1 },
      { item: "b", weight: 1 },
      { item: "c", weight: 1 },
    ]);
  });

  it("should add the given weights to the given items, in the same order", () => {
    const items = ["a", "b", "c"];

    const weights = [1, 2, 3];

    const weightedItem = addWeights(items, weights);

    expect(weightedItem).toEqual([
      { item: "a", weight: 1 },
      { item: "b", weight: 2 },
      { item: "c", weight: 3 },
    ]);
  });

  it("should throw an error if items is not an array", () => {
    const items = {} as [];

    expect(() => addWeights(items)).toThrowError(ITEMS_MUST_BE_AN_ARRAY);
  });

  it("should throw an error if items is empty", () => {
    const items: [] = [];

    expect(() => addWeights(items)).toThrowError(AT_LEAST_ONE_ITEM_IS_REQUIRED);
  });

  it("should throw an error if weights is not an array", () => {
    const items = ["a", "b", "c"];

    const weights = {} as [];

    expect(() => addWeights(items, weights)).toThrowError(WEIGHTS_MUST_BE_AN_ARRAY);
  });

  it("should throw an error if weights is empty", () => {
    const items = ["a", "b", "c"];

    const weights: number[] = [];

    expect(() => addWeights(items, weights)).toThrowError(AT_LEAST_ONE_WEIGHT_IS_REQUIRED);
  });

  it("should throw an error if not all weights are numbers", () => {
    const items = ["a", "b", "c"];

    const weights = [1, 2, "3"] as number[];

    expect(() => addWeights(items, weights)).toThrowError(ALL_WEIGHTS_MUST_BE_NUMBERS);
  });

  it("should throw an error if not all weights are greater than zero", () => {
    const items = ["a", "b", "c"];

    const weightsCollection = [
      [0, 0, 0],
      [-1, -1, -1],
      [NaN, NaN, NaN],
    ];

    weightsCollection.forEach((weights) => {
      expect(() => addWeights(items, weights)).toThrowError(ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO);
    });
  });

  it("should throw an error if the lengths of the given arrays do not match", () => {
    const items = ["a", "b", "c"];

    const weights = [1];

    expect(() => addWeights(items, weights)).toThrowError(THE_NUMBER_OF_WEIGHTS_MUST_MATCH_THE_NUMBER_OF_ITEMS);
  });
});
