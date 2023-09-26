import { EntityType } from "./entities";
import { ItemType } from "./items";

export const CRAFTING_STATIONS = ["workbench", "slime"] satisfies Array<EntityType>;
export type CraftingStation = "workbench" | "slime";

export interface CraftingRecipe {
   readonly product: ItemType;
   /** Number of products created when the crafting recipe is used */
   readonly yield: number;
   readonly ingredients: Partial<Record<ItemType, number>>;
   readonly craftingStation?: CraftingStation;
}

export const CRAFTING_RECIPES: ReadonlyArray<CraftingRecipe> = [
   {
      product: ItemType.workbench,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 15
      }
   },
   {
      product: ItemType.wooden_sword,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 15
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.wooden_pickaxe,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 10
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.wooden_axe,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 10
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.stone_sword,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 5,
         [ItemType.rock]: 15
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.stone_pickaxe,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 5,
         [ItemType.rock]: 10
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.stone_axe,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 5,
         [ItemType.rock]: 10
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.leather_backpack,
      yield: 1,
      ingredients: {
         [ItemType.leather]: 5
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.flesh_sword,
      yield: 1,
      ingredients: {
         [ItemType.raw_beef]: 10,
         [ItemType.slimeball]: 10,
         [ItemType.eyeball]: 1
      },
      craftingStation: "slime"
   },
   {
      product: ItemType.tribe_totem,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 40,
         [ItemType.rock]: 40
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.tribe_hut,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 20,
         [ItemType.leather]: 15
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.barrel,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 20,
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.frost_armour,
      yield: 1,
      ingredients: {
         [ItemType.frostcicle]: 20,
         [ItemType.yeti_hide]: 10
      },
      craftingStation: "workbench"
   },
   {
      product: ItemType.campfire,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 15
      }
   },
   {
      product: ItemType.furnace,
      yield: 1,
      ingredients: {
         [ItemType.campfire]: 1,
         [ItemType.rock]: 20
      }
   },
   {
      product: ItemType.wooden_bow,
      yield: 1,
      ingredients: {
         [ItemType.wood]: 20
      }
   },
   {
      product: ItemType.meat_suit,
      yield: 1,
      ingredients: {
         [ItemType.raw_beef]: 15,
         [ItemType.cactus_spine]: 10
      },
      craftingStation: "workbench"
   }
];

type Item = { type: ItemType, count: number };
type ItemSlots = { [itemSlot: number]: Item };

export function canCraftRecipe(itemSlotRecords: ReadonlyArray<ItemSlots>, recipe: CraftingRecipe): boolean {
   // Tally the total resources available for crafting
   const availableResources: Partial<Record<ItemType, number>> = {};
   for (const itemSlots of itemSlotRecords) {
      for (const item of Object.values(itemSlots)) {
         if (!availableResources.hasOwnProperty(item.type)) {
            availableResources[item.type] = item.count;
         } else {
            availableResources[item.type]! += item.count;
         }
      }
   }
   
   for (const [ingredientType, ingredientCount] of Object.entries(recipe.ingredients).map(entry => [Number(entry[0]), entry[1]]) as ReadonlyArray<[ItemType, number]>) {
      // If there is none of the ingredient available, the recipe cannot be crafted
      if (!availableResources.hasOwnProperty(ingredientType)) {
         return false;
      }

      // If there isn't enough of the ingredient available, the recipe cannot be crafted
      if (availableResources[ingredientType]! < ingredientCount) {
         return false;
      }
   }
   
   return true;
}