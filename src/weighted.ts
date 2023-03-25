import seedrandom from "seedrandom";

type WeightedItem<T> = { item: T; weight: number };

type Options = {
  seed?: string;
};

type WeightedTable<T> = { pick: () => T };

const validateWeightedItems = <T>(items: WeightedItem<T>[]) => {
  if (!Array.isArray(items)) {
    throw new Error("Items must be an Array.");
  }

  if (!items.length) {
    throw new Error("At least one item is required to create a weighted table.");
  }

  if (!items.every((item) => typeof item.weight === "number")) {
    throw new Error("All items must have a corresponding weight.");
  }

  if (!items.every((item) => item.weight > 0)) {
    throw new Error("All weights must be greater than zero.");
  }
};

export function createWeightedTable<T>(items: WeightedItem<T>[], options?: Options): WeightedTable<T> {
  validateWeightedItems(items);

  const totalWeight = items.reduce((prev, curr) => prev + curr.weight, 0);

  const seed = options?.seed;

  const rng = seed ? seedrandom(seed) : Math.random;

  return {
    pick: () => {
      let random = rng() * totalWeight;

      for (const weightedItem of items) {
        random -= weightedItem.weight;

        if (random <= 0) {
          return weightedItem.item;
        }
      }

      throw new Error("Failed to select a weighted item.");
    },
  };
}
