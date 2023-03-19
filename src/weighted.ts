import seedrandom from "seedrandom";

type WeightedItem<T> = { item: T; weight: number };

type Options = {
  seed?: string;
  weights?: number[];
};

type WeightedTable<T> = { pick: () => T };

function isWeightedItemArray<T>(items: T[] | WeightedItem<T>[]): items is WeightedItem<T>[] {
  // https://github.com/microsoft/TypeScript/issues/44373#issuecomment-1405744410
  const itemsFixed: Array<(typeof items)[number]> = items;

  return itemsFixed.every((item) => (item as WeightedItem<T>).weight !== undefined);
}

export function createWeightedTable<T>(items: T[] | WeightedItem<T>[], options?: Options): WeightedTable<T> {
  if (!items || !items.length) {
    throw new Error("At least one item is required to create a weighted table.");
  }

  if (!Array.isArray(items)) {
    throw new Error("Items must be an Array.");
  }

  let weightedItems: WeightedItem<T>[] = [];

  const weights = options?.weights;

  if (Array.isArray(weights) && items.length === weights.length) {
    if (isWeightedItemArray(items)) {
      weightedItems = items.map((item, index) => ({
        item: item.item,
        weight: weights[index],
      }));
    } else {
      weightedItems = items.map((item, index) => ({
        item,
        weight: weights[index],
      }));
    }
  } else if (isWeightedItemArray(items)) {
    weightedItems = items;
  } else {
    if (weights === undefined) {
      weightedItems = items.map((item) => ({
        item,
        weight: 1,
      }));
    } else {
      if (items.length !== weights.length) {
        throw new Error("The number of items does not match the number of weigths.");
      }

      if (!Array.isArray(weights)) {
        throw new Error("Weights must be an Array.");
      }

      throw new Error("Invalid arguments.");
    }
  }

  if (!weightedItems.every((item) => typeof item.weight === "number")) {
    throw new Error("All items must have a corresponding weight.");
  }

  if (!weightedItems.every((item) => item.weight > 0)) {
    throw new Error("All weights must be greater than zero.");
  }

  const totalWeight = weightedItems.reduce((prev, curr) => prev + curr.weight, 0);

  const seed = options?.seed;

  const rng = seed ? seedrandom(seed) : Math.random;

  if (!totalWeight) {
    throw new Error("The total weight must be greater than zero.");
  }

  return {
    pick: () => {
      let random = rng() * totalWeight;

      for (const weightedItem of weightedItems) {
        random -= weightedItem.weight;

        if (random <= 0) {
          return weightedItem.item;
        }
      }

      // Should never reach this point, but just in case...
      throw new Error("Failed to select a weighted item.");
    },
  };
}
