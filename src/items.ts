import { EntityType } from "./entity-info";

export type ItemType = "wood"
   | "workbench"
   | "wooden_sword"
   | "wooden_axe"
   | "wooden_pickaxe"
   | "berry"
   | "raw_beef"
   | "cooked_beef"
   | "rock"
   | "stone_sword"
   | "stone_axe"
   | "stone_pickaxe";

export interface BaseItemInfo {}

export interface StackableItemInfo extends BaseItemInfo {
   readonly stackSize: number;
}

export interface MaterialItemInfo extends StackableItemInfo {}

export interface FoodItemInfo extends StackableItemInfo {
   readonly healAmount: number;
   readonly eatTime: number;
}

export type ToolType = "weapon" | "axe" | "pickaxe";

export interface ToolItemInfo extends BaseItemInfo {
   readonly toolType: ToolType;
   readonly damage: number;
   readonly knockback: number;
   /** Cooldown between attacks */
   readonly attackCooldown: number;
}

export interface WeaponItemInfo extends ToolItemInfo {
   readonly toolType: "weapon";
}

export interface AxeItemInfo extends ToolItemInfo {
   readonly toolType: "axe";
}

export interface PickaxeItemInfo extends ToolItemInfo {
   readonly toolType: "pickaxe";
}

export interface PlaceableItemInfo extends StackableItemInfo {
   readonly entityType: EntityType;
}

export interface ItemClassifications {
   material: MaterialItemInfo;
   food: FoodItemInfo;
   weapon: WeaponItemInfo;
   axe: AxeItemInfo;
   pickaxe: PickaxeItemInfo
   placeable: PlaceableItemInfo;
}

export const ITEM_TYPE_RECORD = {
   wood: "material",
   workbench: "placeable",
   wooden_sword: "weapon",
   wooden_axe: "axe",
   wooden_pickaxe: "pickaxe",
   berry: "food",
   raw_beef: "food",
   cooked_beef: "food",
   rock: "material",
   stone_sword: "weapon",
   stone_axe: "axe",
   stone_pickaxe: "pickaxe"
} satisfies Record<ItemType, keyof ItemClassifications>;

export type ItemInfoEntry<T extends ItemType> = {
   readonly classification: typeof ITEM_TYPE_RECORD[T];
   readonly info: ItemClassifications[typeof ITEM_TYPE_RECORD[T]];
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
         damage: 3,
         knockback: 150,
         attackCooldown: 0.3
      }
   },
   wooden_axe: {
      classification: "axe",
      info: {
         toolType: "axe",
         damage: 3,
         knockback: 100,
         attackCooldown: 0.5
      }
   },
   wooden_pickaxe: {
      classification: "pickaxe",
      info: {
         toolType: "pickaxe",
         damage: 5,
         knockback: 100,
         attackCooldown: 0.5
      }
   },
   berry: {
      classification: "food",
      info: {
         stackSize: 99,
         healAmount: 5,
         eatTime: 0.5
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
         eatTime: 1.5
      }
   },
   rock: {
      classification: "material",
      info: {
         stackSize: 99
      }
   },
   stone_sword: {
      classification: "weapon",
      info: {
         toolType: "weapon",
         damage: 5,
         knockback: 150,
         attackCooldown: 0.3
      }
   },
   stone_axe: {
      classification: "axe",
      info: {
         toolType: "axe",
         damage: 5,
         knockback: 100,
         attackCooldown: 0.5
      }
   },
   stone_pickaxe: {
      classification: "pickaxe",
      info: {
         toolType: "pickaxe",
         damage: 8,
         knockback: 100,
         attackCooldown: 0.5
      }
   }
};