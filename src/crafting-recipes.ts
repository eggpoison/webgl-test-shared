import { ItemType, ITEM_INFO_RECORD, StackableItemInfo } from "./items";

export type CraftingStation = "workbench";

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
         rock: 20
      },
      craftingStation: "workbench"
   },
   {
      product: "stone_pickaxe",
      yield: 1,
      ingredients: {
         wood: 5,
         rock: 15
      },
      craftingStation: "workbench"
   },
   {
      product: "stone_axe",
      yield: 1,
      ingredients: {
         wood: 5,
         rock: 15
      },
      craftingStation: "workbench"
   },
   {
      product: "leather_backpack",
      yield: 1,
      ingredients: {
         leather: 5,
         wood: 5
      },
      craftingStation: "workbench"
   }
];

type Item = { type: ItemType, count: number };
type Inventory = { [itemSlot: number]: Item };

export function canCraftRecipe(inventory: Inventory, recipe: CraftingRecipe, inventorySize: number): boolean {
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

   // Find the stack size of the product
   let productStackSize: number;
   const productInfo = ITEM_INFO_RECORD[recipe.product];
   if (productInfo.hasOwnProperty("stackSize")) {
      productStackSize = (productInfo as StackableItemInfo).stackSize;
   } else {
      productStackSize = 1;
   }

   // 
   // Make sure that there is space to craft the recipe
   // 

   // If there is a slot available for the product, then it can be put there.
   for (let itemSlot = 1; itemSlot <= inventorySize; itemSlot++) {
      if (!inventory.hasOwnProperty(itemSlot)) {
         return true;
      }
   }

   // If the product can be added to existing stacks in entirety, then there is space and it can be crafted
   {
      let remainingAmountToAdd = recipe.yield;
      for (const item of Object.values(inventory)) {
         if (item.type !== recipe.product) {
            continue;
         }
         
         const addAmount = Math.min(remainingAmountToAdd, productStackSize - item.count);
         remainingAmountToAdd -= addAmount;

         if (remainingAmountToAdd === 0) {
            return true;  
         }
      }
   }


   // If consuming the ingredients would free a slot for the product, it can be crafted
   for (const [ingredientType, ingredientCount] of Object.entries(recipe.ingredients) as ReadonlyArray<[ItemType, number]>) {
      for (const item of Object.values(inventory)) {
         if (item.type !== ingredientType) continue;
         
         if (item.count === ingredientCount) {
            return true;
         }
         break;
      }
   }
   
   // Otherwise the recipe cannot be crafted
   return false;
}