import { createWeightedTable } from "./weighted";

describe("createWeightedTable", () => {
  it("should create a weighted table with the given items", () => {
    const items = ["a", "b"];

    const table = createWeightedTable(items);

    const item = table.pick();

    expect(items).toContain(item);
  });

  it("should throw an error if weight is invalid", () => {
    const items = [{ item: "a", weight: 0 }];

    expect(() => createWeightedTable(items)).toThrowError();
  });
});
