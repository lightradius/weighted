import { WeightedItem } from "./types";
import { validateItems, validateLengths, validateWeights } from "./validation";

export const addWeights = <T>(items: T[], weights?: number[]): WeightedItem<T>[] => {
  validateItems(items);

  if (weights) {
    validateWeights(weights);

    validateLengths(items.length, weights.length);

    return items.map((item, index) => ({ item, weight: weights[index] }));
  }

  return items.map((item) => ({ item, weight: 1 }));
};
