import {
  ALL_ITEMS_MUST_BE_WEIGHTED_ITEMS,
  ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO,
  ALL_WEIGHTS_MUST_BE_NUMBERS,
  AT_LEAST_ONE_ITEM_IS_REQUIRED,
  ITEMS_MUST_BE_AN_ARRAY,
  SEED_MUST_BE_A_STRING,
  WEIGHTS_CANNOT_BE_NAN,
} from "./errors";

import { WeightedItem } from "./types";

const isWeightedItemArray = <T>(items: WeightedItem<T>[] | T[]): items is WeightedItem<T>[] => {
  return (items as WeightedItem<T>[]).every((item: WeightedItem<T>) => "item" in item && "weight" in item && typeof item.weight !== "undefined");
};

export const validateSeed = (seed: string) => {
  if (typeof seed !== "string") {
    throw new Error(SEED_MUST_BE_A_STRING);
  }
};

export const validateItems = <T>(items: T[]) => {
  if (!Array.isArray(items)) {
    throw new Error(ITEMS_MUST_BE_AN_ARRAY);
  }

  if (!items.length) {
    throw new Error(AT_LEAST_ONE_ITEM_IS_REQUIRED);
  }
};

export const validateWeight = (weight: number) => {
  if (typeof weight !== "number") {
    throw new Error(ALL_WEIGHTS_MUST_BE_NUMBERS);
  }

  if (Number.isNaN(weight)) {
    throw new Error(WEIGHTS_CANNOT_BE_NAN);
  }

  if (weight <= 0) {
    throw new Error(ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO);
  }
};

export const validateWeightedItems = <T>(items: WeightedItem<T>[]) => {
  validateItems(items);

  if (!isWeightedItemArray(items)) {
    throw new Error(ALL_ITEMS_MUST_BE_WEIGHTED_ITEMS);
  }

  for (const item of items) {
    validateWeight(item.weight);
  }
};
