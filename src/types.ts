export type WeightedItem<T> = { item: T; weight: number };

export type WeightedTable<T> = { pick: () => T; getTotalWeight: () => number };

export type Options = {
  seed?: string;
};
