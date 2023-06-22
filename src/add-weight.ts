import { WeightedItem } from "./types";
import { validateItems, validateWeight } from "./validation";

export const addWeight = <T>(items: T[], weight: number): WeightedItem<T>[] => {
  validateItems(items);

  validateWeight(weight);

  return items.map((item) => ({ item, weight }));
};
