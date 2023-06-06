import {
  ALL_ITEMS_MUST_BE_WEIGHTED_ITEMS,
  ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO,
  ALL_WEIGHTS_MUST_BE_NUMBERS,
  AT_LEAST_ONE_ITEM_IS_REQUIRED,
  AT_LEAST_ONE_WEIGHT_IS_REQUIRED,
  ITEMS_MUST_BE_AN_ARRAY,
  THE_NUMBER_OF_WEIGHTS_MUST_MATCH_THE_NUMBER_OF_ITEMS,
  SEED_MUST_BE_A_STRING,
  WEIGHTS_MUST_BE_AN_ARRAY,
} from "./errors";

import { WeightedItem } from "./types";

const isWeightedItemArray = <T>(items: WeightedItem<T>[] | T[]): items is WeightedItem<T>[] => {
  return (items as WeightedItem<T>[]).every((item: WeightedItem<T>) => "item" in item && "weight" in item && typeof item.weight === "number");
};

export const validateSeed = (seed: string) => {
  if (typeof seed !== "string") {
    throw new Error(SEED_MUST_BE_A_STRING);
  }
};

export const validateLengths = (itemsLength: number, weightsLength: number) => {
  if (itemsLength !== weightsLength) {
    throw new Error(THE_NUMBER_OF_WEIGHTS_MUST_MATCH_THE_NUMBER_OF_ITEMS);
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

export const validateWeights = (weights: number[]) => {
  if (!Array.isArray(weights)) {
    throw new Error(WEIGHTS_MUST_BE_AN_ARRAY);
  }

  if (!weights.length) {
    throw new Error(AT_LEAST_ONE_WEIGHT_IS_REQUIRED);
  }

  if (!weights.every((weight) => typeof weight === "number")) {
    throw new Error(ALL_WEIGHTS_MUST_BE_NUMBERS);
  }

  if (!weights.every((weight) => weight > 0)) {
    throw new Error(ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO);
  }
};

export const validateWeightedItems = <T>(items: WeightedItem<T>[]) => {
  if (!Array.isArray(items)) {
    throw new Error(ITEMS_MUST_BE_AN_ARRAY);
  }

  if (!items.length) {
    throw new Error(AT_LEAST_ONE_ITEM_IS_REQUIRED);
  }

  if (!isWeightedItemArray(items)) {
    throw new Error(ALL_ITEMS_MUST_BE_WEIGHTED_ITEMS);
  }

  if (!items.every((item) => item.weight > 0)) {
    throw new Error(ALL_WEIGHTS_MUST_BE_GREATER_THAN_ZERO);
  }
};
