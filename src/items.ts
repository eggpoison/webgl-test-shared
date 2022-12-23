import { EntityType } from "./entity-info";

export type ItemType = "wood"
   | "workbench"
   | "wooden_sword"
   | "wooden_axe"
   | "berry"
   | "raw_beef"
   | "cooked_beef";

export interface BaseItemInfo {}

export interface StackableItemInfo extends BaseItemInfo {
   readonly stackSize: number;
}

export interface MaterialItemInfo extends StackableItemInfo {}

export interface FoodItemInfo extends StackableItemInfo {
   readonly healAmount: number;
   readonly eatTime: number;
}

export type ToolType = "weapon" | "axe";

export interface ToolItemInfo extends BaseItemInfo {
   readonly toolType: ToolType;
   /** Cooldown between attacks */
   readonly attackCooldown: number;
}

export interface WeaponItemInfo extends ToolItemInfo {
   readonly toolType: "weapon";
   readonly damage: number;
}

export interface AxeItemInfo extends ToolItemInfo {
   readonly toolType: "axe";
   readonly damage: number;
}

export interface PlaceableItemInfo extends StackableItemInfo {
   readonly entityType: EntityType;
}

export interface ItemClassifications {
   material: MaterialItemInfo;
   food: FoodItemInfo;
   weapon: WeaponItemInfo;
   axe: AxeItemInfo;
   placeable: PlaceableItemInfo;
}

export interface ITEM_TYPE_RECORD {
   wood: () => "material";
   workbench: () => "placeable";
   wooden_sword: () => "weapon";
   wooden_axe: () => "axe";
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
         stackSize: 99
      }
   },
   workbench: {
      classification: "placeable",
      info: {
         stackSize: 99,
         entityType: "workbench"
      }
   },
   wooden_sword: {
      classification: "weapon",
      info: {
         toolType: "weapon",
         attackCooldown: 0.3,
         damage: 3
      }
   },
   wooden_axe: {
      classification: "axe",
      info: {
         toolType: "axe",
         attackCooldown: 0.5,
         damage: 3
      }
   },
   berry: {
      classification: "food",
      info: {
         stackSize: 99,
         healAmount: 5,
         eatTime: 1
      }
   },
   raw_beef: {
      classification: "food",
      info: {
         stackSize: 99,
         healAmount: 2,
         eatTime: 2
      }
   },
   cooked_beef: {
      classification: "food",
      info: {
         stackSize: 99,
         healAmount: 5,
         eatTime: 2
      }
   }
};