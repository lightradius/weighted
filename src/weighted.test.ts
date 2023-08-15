import {
  ALL_ITEMS_MUST_BE_WEIGHTED_ITEMS,
  ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO,
  ALL_WEIGHTS_MUST_BE_NUMBERS,
  AT_LEAST_ONE_ITEM_IS_REQUIRED,
  EXCLUSIVE_MUST_BE_A_BOOLEAN,
  ITEMS_MUST_BE_AN_ARRAY,
  QUANTITY_MUST_BE_A_NUMBER,
  SEED_MUST_BE_A_STRING,
  WEIGHTS_CANNOT_BE_NAN,
} from "./errors";
import { createWeightedTable } from "./weighted";

describe("createWeightedTable", () => {
  it("should create a weighted table with the given items", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const table = createWeightedTable(weightedItems);

    expect(table).toStrictEqual({
      getTotalWeight: expect.any(Function),
      pick: expect.any(Function),
    });
  });

  it("should return a single item by default", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const table = createWeightedTable(weightedItems);

    const pickedItem = table.pick();

    expect(pickedItem).toBe("a");
  });

  it("should return an array of items if quantity is provided", () => {
    const weightedItems = [
      { item: "a", weight: 1 },
      { item: "b", weight: 1 },
      { item: "c", weight: 1 },
      { item: "d", weight: 1 },
      { item: "e", weight: 1 },
    ];

    const quantities = [1, 2, 3];

    const table = createWeightedTable(weightedItems);

    for (const quantity of quantities) {
      const pickedItems = table.pick({
        quantity,
      });

      expect(pickedItems).toHaveLength(quantity);
    }
  });

  it("should never pick a repeated item if exclusive is set to true", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const table = createWeightedTable(weightedItems);

    const pickedItems = table.pick({
      quantity: 2,
      exclusive: true,
    });

    expect(pickedItems).toStrictEqual(["a"]);
  });

  it("should be able to return another weighted table", () => {
    const firstWeightedItems = [{ item: "a", weight: 1 }];

    const firstTable = createWeightedTable(firstWeightedItems);

    const secondWeightedItems = [{ item: firstTable, weight: 1 }];

    const secondTable = createWeightedTable(secondWeightedItems);

    const pickedItem = secondTable.pick();

    expect(pickedItem).toBe(firstTable);
  });

  it("should throw an error if items is not an array", () => {
    const weightedItems = {} as [];

    expect(() => createWeightedTable(weightedItems)).toThrowError(ITEMS_MUST_BE_AN_ARRAY);
  });

  it("should throw an error if items is empty", () => {
    const weightedItems: [] = [];

    expect(() => createWeightedTable(weightedItems)).toThrowError(AT_LEAST_ONE_ITEM_IS_REQUIRED);
  });

  it("should throw an error if any weight undefined", () => {
    const weightedItems = [{ item: "a", weight: undefined as unknown as number }];

    expect(() => createWeightedTable(weightedItems)).toThrowError(ALL_ITEMS_MUST_BE_WEIGHTED_ITEMS);
  });

  it("should throw an error if any weight is not a number", () => {
    const weightedItems = [{ item: "a", weight: {} as unknown as number }];

    expect(() => createWeightedTable(weightedItems)).toThrowError(ALL_WEIGHTS_MUST_BE_NUMBERS);
  });

  it("should throw an error if any weight is NaN", () => {
    const weightedItems = [{ item: "a", weight: NaN }];

    expect(() => createWeightedTable(weightedItems)).toThrowError(WEIGHTS_CANNOT_BE_NAN);
  });

  it("should throw an error if any weight is not greater than zero", () => {
    const weightedItemsCollection = [[{ item: "a", weight: 0 }], [{ item: "a", weight: -1 }]];

    weightedItemsCollection.forEach((weightedItems) => {
      expect(() => createWeightedTable(weightedItems)).toThrowError(ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO);
    });
  });

  it("should throw an error if seed is not a string", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const options = { seed: {} as unknown as string };

    expect(() => createWeightedTable(weightedItems, options)).toThrowError(SEED_MUST_BE_A_STRING);
  });

  it("should throw an error if quantity is not a number", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const table = createWeightedTable(weightedItems);

    expect(() => table.pick({ quantity: "1" as unknown as number })).toThrowError(QUANTITY_MUST_BE_A_NUMBER);
  });

  it("should throw an error if exclusive is not a boolean", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const table = createWeightedTable(weightedItems);

    expect(() => table.pick({ quantity: 1, exclusive: "true" as unknown as boolean })).toThrowError(
      EXCLUSIVE_MUST_BE_A_BOOLEAN,
    );
  });

  it("should throw an error if seed is not a string", () => {
    const weightedItems = [
      { item: "a", weight: 1 },
      { item: "b", weight: 2 },
      { item: "c", weight: 3 },
    ];

    const options = { seed: "seed" }; // random number should always be 3.397084615516376

    const table = createWeightedTable(weightedItems, options);

    const pickedItem = table.pick();

    expect(pickedItem).toBe("c");
  });

  it("should return the total weight", () => {
    const weightedItems = [
      { item: "a", weight: 1 },
      { item: "b", weight: 2 },
      { item: "c", weight: 3 },
    ];

    const table = createWeightedTable(weightedItems);

    expect(table.getTotalWeight()).toBe(6);
  });
});
