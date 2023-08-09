import { EntityType } from "./entities";

export const ITEM_TYPE_LITERALS = [
   "wood",
   "workbench",
   "wooden_sword",
   "wooden_axe",
   "wooden_pickaxe",
   "berry",
   "raw_beef",
   "cooked_beef",
   "rock",
   "stone_sword",
   "stone_axe",
   "stone_pickaxe",
   "leather",
   "leather_backpack",
   "cactus_spine",
   "yeti_hide",
   "frostcicle",
   "slimeball",
   "eyeball",
   "flesh_sword",
   "tribe_totem",
   "tribe_hut",
   "barrel",
   "frost_armour"
] as const;

export type ItemType = typeof ITEM_TYPE_LITERALS[number];

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

export interface BackpackItemInfo extends BaseItemInfo {
   /** Width of the backpack inventory in terms of item slots. */
   readonly inventoryWidth: number;
   /** Width of the backpack inventory in terms of item slots. */
   readonly inventoryHeight: number
}

export interface ArmourItemInfo extends BaseItemInfo {
   readonly armour: number;
}

export interface ItemInfoRecord {
   material: MaterialItemInfo;
   food: FoodItemInfo;
   weapon: WeaponItemInfo;
   axe: AxeItemInfo;
   pickaxe: PickaxeItemInfo
   placeable: PlaceableItemInfo;
   backpack: BackpackItemInfo;
   armour: ArmourItemInfo;
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
   stone_pickaxe: "pickaxe",
   leather: "material",
   leather_backpack: "backpack",
   cactus_spine: "material",
   yeti_hide: "material",
   frostcicle: "material",
   slimeball: "material",
   eyeball: "material",
   flesh_sword: "weapon",
   tribe_totem: "placeable",
   tribe_hut: "placeable",
   barrel: "placeable",
   frost_armour: "armour"
} satisfies Record<ItemType, keyof ItemInfoRecord>;

export type ItemInfo<T extends ItemType> = ItemInfoRecord[typeof ITEM_TYPE_RECORD[T]];

export const ITEM_INFO_RECORD: { [T in ItemType]: ItemInfo<T> } = {
   wood: {
      stackSize: 99
   },
   workbench: {
      stackSize: 99,
      entityType: "workbench"
   },
   wooden_sword: {
      toolType: "weapon",
      damage: 3,
      knockback: 150,
      attackCooldown: 0.3
   },
   wooden_axe: {
      toolType: "axe",
      damage: 3,
      knockback: 100,
      attackCooldown: 0.5
   },
   wooden_pickaxe: {
      toolType: "pickaxe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5
   },
   berry: {
      stackSize: 99,
      healAmount: 1,
      eatTime: 0.75
   },
   raw_beef: {
      stackSize: 99,
      healAmount: 1,
      eatTime: 2
   },
   cooked_beef: {
      stackSize: 99,
      healAmount: 5,
      eatTime: 1.5
   },
   rock: {
      stackSize: 99
   },
   stone_sword: {
      toolType: "weapon",
      damage: 5,
      knockback: 150,
      attackCooldown: 0.3
   },
   stone_axe: {
      toolType: "axe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5
   },
   stone_pickaxe: {
      toolType: "pickaxe",
      damage: 8,
      knockback: 100,
      attackCooldown: 0.5
   },
   leather: {
      stackSize: 99
   },
   leather_backpack: {
      inventoryWidth: 2,
      inventoryHeight: 2
   },
   cactus_spine: {
      stackSize: 99
   },
   yeti_hide: {
      stackSize: 99
   },
   frostcicle: {
      stackSize: 99
   },
   slimeball: {
      stackSize: 99
   },
   eyeball: {
      stackSize: 99
   },
   flesh_sword: {
      toolType: "weapon",
      damage: 2,
      knockback: 150,
      attackCooldown: 0.3
   },
   tribe_totem: {
      stackSize: 99,
      entityType: "tribe_totem"
   },
   tribe_hut: {
      stackSize: 99,
      entityType: "tribe_hut"
   },
   barrel: {
      stackSize: 99,
      entityType: "barrel"
   },
   frost_armour: {
      armour: 1
   }
};