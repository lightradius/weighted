import seedrandom from "seedrandom";
import { PickManyOptions, PickOneOptions, PickOptions, TableOptions, WeightedItem, WeightedTable } from "./types";
import { validateExclusive, validateQuantity, validateResult, validateSeed, validateWeightedItems } from "./validation";

export const createWeightedTable = <T>(
  weightedItems: WeightedItem<T>[],
  options: TableOptions = {},
): WeightedTable<T> => {
  validateWeightedItems(weightedItems);

  const totalWeight = weightedItems.reduce((prev, curr) => prev + curr.weight, 0);

  const seed = options?.seed;

  if (seed) {
    validateSeed(seed);
  }

  const rng = seed ? seedrandom(seed) : Math.random;

  /**
   * forced to use classic function declaration here because TypeScript does not yet support overloaded arrow functions
   * https://stackoverflow.com/a/76907382/2887078
   * https://github.com/microsoft/TypeScript/issues/47669
   */
  function pick(): T;
  function pick(options: PickOneOptions): T;
  function pick(options: PickManyOptions): T[];
  function pick(options?: PickOptions) {
    const { quantity, exclusive = false } = options ?? {};

    validateExclusive(exclusive);

    let random = rng() * totalWeight;

    if (quantity) {
      validateQuantity(quantity);

      const result: T[] = [];

      for (let i = 0; i < quantity; i++) {
        const validWeightedItems = exclusive
          ? weightedItems.filter(({ item }) => !result.includes(item))
          : weightedItems;

        for (const weightedItem of validWeightedItems) {
          random -= weightedItem.weight;

          if (random <= 0) {
            result.push(weightedItem.item);
            break;
          }
        }
      }

      if (!result.length) {
        validateResult();
      }

      return result;
    }

    for (const weightedItem of weightedItems) {
      random -= weightedItem.weight;

      if (random <= 0) {
        return weightedItem.item;
      }
    }

    validateResult();
  }

  return {
    getTotalWeight: () => totalWeight,
    pick,
  };
};
