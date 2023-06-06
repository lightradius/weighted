import seedrandom from "seedrandom";
import { Options, WeightedItem, WeightedTable } from "./types";
import { validateSeed, validateWeightedItems } from "./validation";
import { FAILED_TO_SELECT_A_WEIGHTED_ITEM } from "./errors";

export const createWeightedTable = <T>(items: WeightedItem<T>[], options: Options = {}): WeightedTable<T> => {
  validateWeightedItems(items);

  const totalWeight = items.reduce((prev, curr) => prev + curr.weight, 0);

  const seed = options?.seed;

  if (seed) {
    validateSeed(seed);
  }

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

      throw new Error(FAILED_TO_SELECT_A_WEIGHTED_ITEM); // should never happen
    },
    getTotalWeight: () => totalWeight,
  };
};
