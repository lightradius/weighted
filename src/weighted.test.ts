import { createWeightedTable } from "./weighted";

describe("createWeightedTable", () => {
  it("should create a weighted table with the given items", () => {
    const weightedItems = [{ item: "a", weight: 1 }];

    const table = createWeightedTable(weightedItems);

    const pickedItem = table.pick();

    expect(pickedItem).toBe("a");
  });

  it("should throw an error if items is not an array", () => {
    const weightedItems = {} as [];

    expect(() => createWeightedTable(weightedItems)).toThrowError("Items must be an Array.");
  });

  it("should throw an error if items is empty", () => {
    const weightedItems = [] as [];

    expect(() => createWeightedTable(weightedItems)).toThrowError("At least one item is required to create a weighted table.");
  });

  it("should throw an error if any weight is invalid or undefined", () => {
    const weightedItems = [{ item: "a", weight: undefined as unknown as number }];

    expect(() => createWeightedTable(weightedItems)).toThrowError("All items must have a corresponding weight.");
  });

  it("should throw an error if any weight is not greater than zero", () => {
    const weightedItems = [{ item: "a", weight: 0 }];

    expect(() => createWeightedTable(weightedItems)).toThrowError("All weights must be greater than zero.");
  });
});
