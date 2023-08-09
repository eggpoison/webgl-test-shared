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
      product: "workbench",
      yield: 1,
      ingredients: {
         wood: 15
      }
   },
   {
      product: "wooden_sword",
      yield: 1,
      ingredients: {
         wood: 15
      },
      craftingStation: "workbench"
   },
   {
      product: "wooden_pickaxe",
      yield: 1,
      ingredients: {
         wood: 10
      },
      craftingStation: "workbench"
   },
   {
      product: "wooden_axe",
      yield: 1,
      ingredients: {
         wood: 10
      },
      craftingStation: "workbench"
   },
   {
      product: "stone_sword",
      yield: 1,
      ingredients: {
         wood: 5,
         rock: 15
      },
      craftingStation: "workbench"
   },
   {
      product: "stone_pickaxe",
      yield: 1,
      ingredients: {
         wood: 5,
         rock: 10
      },
      craftingStation: "workbench"
   },
   {
      product: "stone_axe",
      yield: 1,
      ingredients: {
         wood: 5,
         rock: 10
      },
      craftingStation: "workbench"
   },
   {
      product: "leather_backpack",
      yield: 1,
      ingredients: {
         leather: 5
      },
      craftingStation: "workbench"
   },
   {
      product: "flesh_sword",
      yield: 1,
      ingredients: {
         raw_beef: 10,
         slimeball: 10,
         eyeball: 1
      },
      craftingStation: "slime"
   },
   {
      product: "tribe_totem",
      yield: 1,
      ingredients: {
         wood: 40,
         rock: 40
      },
      craftingStation: "workbench"
   },
   {
      product: "tribe_hut",
      yield: 1,
      ingredients: {
         wood: 20,
         leather: 15
      },
      craftingStation: "workbench"
   },
   {
      product: "barrel",
      yield: 1,
      ingredients: {
         wood: 20,
      },
      craftingStation: "workbench"
   },
   {
      product: "frost_armour",
      yield: 1,
      ingredients: {
         frostcicle: 20,
         yeti_hide: 10
      },
      craftingStation: "workbench"
   }
];

type Item = { type: ItemType, count: number };
type ItemSlots = { [itemSlot: number]: Item };

export function canCraftRecipe(itemSlotRecords: ReadonlyArray<ItemSlots>, recipe: CraftingRecipe, inventorySize: number): boolean {
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
   
   for (const [ingredientType, ingredientCount] of Object.entries(recipe.ingredients) as ReadonlyArray<[ItemType, number]>) {
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