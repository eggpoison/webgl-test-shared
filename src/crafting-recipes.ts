import { ItemType } from "./items";

export type CraftingStation = "workbench";

export interface CraftingRecipe {
   readonly product: ItemType;
   readonly productCount: number;
   readonly ingredients: Partial<Record<ItemType, number>>;
   readonly craftingStation?: CraftingStation;
}

export const CRAFTING_RECIPES: ReadonlyArray<CraftingRecipe> = [
   {
      product: "wooden_sword",
      productCount: 1,
      ingredients: {
         wood: 10
      },
      craftingStation: "workbench"
   }
];

type Item = { type: ItemType, count: number };
type Inventory = { [itemSlot: number]: Item };

export function canCraftRecipe(inventory: Inventory, recipe: CraftingRecipe): boolean {
   // Tally the total resources available for crafting
   const availableResources: Partial<Record<ItemType, number>> = {};
   for (const item of Object.values(inventory)) {
      if (!availableResources.hasOwnProperty(item.type)) {
         availableResources[item.type] = item.count;
      } else {
         availableResources[item.type]! += item.count;
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