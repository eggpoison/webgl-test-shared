export type ItemID = 1;

export interface BaseItemInfo {
   readonly name: string;
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

export type ItemInfo = BaseItemInfo | WeaponItemInfo;

export const ITEM_RECORD: Record<ItemID, ItemInfo> = {
   1: {
      name: "Wooden Sword",
      toolType: "weapon",
      damage: 3
   }
};