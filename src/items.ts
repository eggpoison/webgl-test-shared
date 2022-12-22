import { EntityType } from "./entity-info";

export type ItemType = "wood"
   | "workbench"
   | "wooden_sword"
   | "berry"
   | "raw_beef"
   | "cooked_beef";

export interface BaseItemInfo {
   readonly name: string;
}

export interface StackableItemInfo extends BaseItemInfo {
   readonly stackSize: number;
}

export interface MaterialItemInfo extends StackableItemInfo {}

export interface FoodItemInfo extends StackableItemInfo {
   readonly healAmount: number;
   readonly eatTime: number;
}

export type ToolType = "weapon";

export interface ToolItemInfo extends BaseItemInfo {
   readonly toolType: ToolType;
   /** Time taken for the tool to be used */
   readonly useTime: number;
}

export interface WeaponItemInfo extends ToolItemInfo {
   readonly toolType: "weapon";
   readonly damage: number;
}

export interface PlaceableItemInfo extends StackableItemInfo {
   readonly entityType: EntityType;
}

export interface ItemClassifications {
   material: MaterialItemInfo;
   food: FoodItemInfo;
   weapon: WeaponItemInfo;
   placeable: PlaceableItemInfo;
}

interface ITEM_TYPE_RECORD {
   wood: () => "material";
   workbench: () => "placeable";
   wooden_sword: () => "weapon";
   berry: () => "food";
   raw_beef: () => "food";
   cooked_beef: () => "food";
}

export type ItemInfoEntry<T extends ItemType> = {
   readonly classification: ReturnType<ITEM_TYPE_RECORD[T]>;
   readonly info: ItemClassifications[ReturnType<ITEM_TYPE_RECORD[T]>];
}

export type ItemInfo = MaterialItemInfo | FoodItemInfo | WeaponItemInfo;

export const ITEM_INFO_RECORD: { [T in ItemType]: ItemInfoEntry<T> } = {
   wood: {
      classification: "material",
      info: {
         name: "Wood",
         stackSize: 99
      }
   },
   workbench: {
      classification: "placeable",
      info: {
         name: "Workbench",
         stackSize: 99,
         entityType: "workbench"
      }
   },
   wooden_sword: {
      classification: "weapon",
      info: {
         name: "Wooden Sword",
         toolType: "weapon",
         useTime: 0.4,
         damage: 3
      }
   },
   berry: {
      classification: "food",
      info: {
         name: "Berry",
         stackSize: 99,
         healAmount: 5,
         eatTime: 1
      }
   },
   raw_beef: {
      classification: "food",
      info: {
         name: "Raw Beef",
         stackSize: 99,
         healAmount: 2,
         eatTime: 2
      }
   },
   cooked_beef: {
      classification: "food",
      info: {
         name: "Cooked Beef",
         stackSize: 99,
         healAmount: 5,
         eatTime: 2
      }
   }
};