import { ItemType, ITEM_INFO_RECORD, StackableItemInfo } from "./items";

export type CraftingStation = "workbench";

export interface CraftingRecipe {
   readonly product: ItemType;
   readonly productCount: number;
   readonly ingredients: Partial<Record<ItemType, number>>;
   readonly craftingStation?: CraftingStation;
}

export const CRAFTING_RECIPES: ReadonlyArray<CraftingRecipe> = [
   {
      product: "workbench",
      productCount: 1,
      ingredients: {
         wood: 1
         // wood: 15
      }
   },
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
   if (productInfo.info.hasOwnProperty("stackSize")) {
      productStackSize = (productInfo.info as StackableItemInfo).stackSize;
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
      let remainingAmountToAdd = recipe.productCount;
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