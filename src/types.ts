export type TableOptions = {
  seed?: string;
};

export type PickOneOptions = {
  quantity?: undefined;
  exclusive?: undefined;
};

export type PickManyOptions = {
  quantity: number;
  exclusive?: boolean;
};

export type PickOptions = PickOneOptions | PickManyOptions;

export type WeightedItem<T> = { item: T; weight: number };

export interface WeightedTable<T> {
  pick: {
    (): T;
    (options: PickOneOptions): T;
    (options: PickManyOptions): T[];
  };
  getTotalWeight: () => number;
}
