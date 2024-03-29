# Weighted

Weighted is a TypeScript project that provides utility functions for creating a weighted table. The table can be used to randomly select an item from a list of items where each item has a corresponding weight. Weights influence the likelihood that an item will be picked: a higher weight means a higher relative likelihood of being being picked.

| Item   | Weight |
| ------ | ------ |
| Apple  | 0.75   |
| Orange | 0.25   |

In the example above, you'd be 3 times more likely to get an Apple than you'd be to get an Orange when picking a random item from the list.

## Installation

Weighted is scoped to `lrkit`. To install the package, run the following command:

```
npm i @lrkit/weighted
```

`lrkit` stands for light radius kit.

## Usage

To use the package, import the `weighted` function to create a weighted table from a `WeightedItem<T>` list. The returned object can be used to randomly select an item from the list at will.

```typescript
import { weighted } from "@lrkit/weighted";

const items: WeightedItem<T> = [
  {
    item: "a",
    weight: 3,
  },
  {
    item: "b",
    weight: 1,
  },
];

const table = weighted(items);

const result = table.pick(); // mostly "a", sometimes "b"
```

### Table options

`weighted` accepts an options object as its second argument. Currently the only option available is `seed`, which allows you to set a seed for the random number generator used to pick items from the table. This is useful for testing purposes, or if you want to be able to reproduce the same results more than once for whatever reason.

```typescript
const table = weighted(items, { seed: "my-seed" });
```

### Pick options

The `pick` method itself also accepts an options object as its first argument. There are two options available: `quantity` and `exclusive`.

`quantity` allows you to pick more than one item from the table at once, while `exclusive` ensures that no item is picked more than once.

```typescript
const items = [
  {
    item: "a",
    weight: 1,
  },
  {
    item: "b",
    weight: 1,
  },
  {
    item: "c",
    weight: 1,
  },
];

const table = weighted(items);

const result = table.pick({ quantity: 2, exclusive: true }); // ["a", "b"] or ["a", "c"] or ["b", "c"], but never ["a", "a"] or ["b", "b"] or ["c", "c"]

const result = table.pick({ quantity: 3, exclusive: true }); // guaranteed ["a", "b", "c"]
```

`exclusive` can only be used when `quantity` is also set, as it would be meaningless to use it for only one item.

## Auxiliary functions

`weighted` also exports one auxiliary function called `addWeight` which you can use to add a weight property to any list of items. This is useful when you want to create a weighted table from a list of items that don't have a weight property, for example:

```typescript
enum WEIGHTS { // remember, heavier items are more likely to be picked
  common = 3,
  uncommon = 2,
  rare = 1,
}

const weightedCommon = addWeight(commonItems, WEIGHTS.common);

const weightedUncommon = addWeight(uncommonItems, WEIGHTS.uncommon);

const weightedRare = addWeight(rareItems, WEIGHTS.rare);

const weightedItems = weighted([...weightedCommon, ...weightedUncommon, ...weightedRare]);
```

Note: `addWeight` attributes the same weight to every item passed as part of the first argument.

## The WeightedItem type

Beforing using `weighted` to create a weighted table, you must first create a `WeightedItem<T>` list to pass as its first argument:

```typescript
type WeightedItem<T> = { item: T; weight: number };
```

This shape offers some advantages over the alternatives. Let's go over a couple of possible alterantive implementations:

### Items and weights as separate arguments

```typescript
declare const createWeightedTable: <T>(items: T[], weights: number[]) => WeightedTable<T>;
```

- Makes it easier to accidently pass mismatched lists, either because some weight is missing, or because the weight information is simply wrong, since the only way to match an item to its corresponding weight would be to match the elements at the same index on both arrays.
- Much harder to make changes to large lists.
- No type safety, you'll only notice missing or mismatched weights on runtime, or worse, never.

### Record

```typescript
type WeightedItem<T> = Record<[number, T]>;
```

- Keys as items:
  - We'd be limiting ourselves tremendously in possible item types, and we want `weighted` to be as flexible as possible.
- Keys as weights:
  - It's not immediately clear what that number is supposed to represent.
  - Extra gymnastics would be required to pick a value `T` out of `Record<[number, T]>` (extracting total weight for example). Not impossible, but still awkward.

### WeightedItem<T>

`WeightedItem<T>` provides type checking and makes it clear that every item requires a corresponding weight, keeping the weight property tightly coupled to its corresponding item and eliminating the risk of accidentally passing in an array of items without a corresponding weight.

```typescript
const weightedItems = [{ item: "a" }];

const table = createWeightedTable(weightedItems); // Property 'weight' is missing in type '{ item: string; }' but required in type 'WeightedItem<string>'
```

It also guarantees that all your items must be of the same type, which, depending on your use case, might look like an advantage or a disadvantage, but if you ever see yourself needing different item types on a weighted table, consider creating more than one table instead.

Remember: a weighted table can return another weighted table!

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request.

## License

This project is licensed under the MPL 2.0 License. See the LICENSE file for details.
