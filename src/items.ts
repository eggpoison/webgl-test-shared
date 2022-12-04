export type ItemType = "wooden_sword"
   | "berry"
   | "raw_beef"
   | "cooked_beef";

export interface BaseItemInfo {
   readonly name: string;
}

export interface FoodItem extends BaseItemInfo {
   readonly healAmount: number;
}

export interface ToolItemInfo extends BaseItemInfo {
   readonly toolType: string;
   /** Time taken for the tool to be used */
   readonly useTime: number;
}

export interface WeaponItemInfo extends ToolItemInfo {
   readonly toolType: "weapon";
   readonly damage: number;
   readonly trueDamage?: number;
}

export type ItemInfo = FoodItem | WeaponItemInfo;

export const ITEM_INFO_RECORD: Record<ItemType, ItemInfo> = {
   wooden_sword: {
      name: "Wooden Sword",
      toolType: "weapon",
      useTime: 0.4,
      damage: 3
   },
   berry: {
      name: "Berry",
      healAmount: 5
   },
   raw_beef: {
      name: "Raw Beef",
      healAmount: 2
   },
   cooked_beef: {
      name: "Cooked Beef",
      healAmount: 5
   }
};