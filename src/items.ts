import { EntityType, EntityTypeConst } from "./entities";
import { SETTINGS } from "./settings";

export enum ItemType {
   wood,
   workbench,
   wooden_sword,
   wooden_axe,
   wooden_pickaxe,
   berry,
   raw_beef,
   cooked_beef,
   rock,
   stone_sword,
   stone_axe,
   stone_pickaxe,
   leather,
   leather_backpack,
   cactus_spine,
   yeti_hide,
   frostcicle,
   slimeball,
   eyeball,
   flesh_sword,
   tribe_totem,
   tribe_hut,
   barrel,
   frost_armour,
   campfire,
   furnace,
   wooden_bow,
   meat_suit,
   deepfrost_heart,
   deepfrost_sword,
   deepfrost_pickaxe,
   deepfrost_axe,
   deepfrost_armour,
   raw_fish,
   cooked_fish,
   fishlord_suit
}

export interface BaseItemInfo {}

export interface StackableItemInfo extends BaseItemInfo {
   readonly stackSize: number;
}

export interface MaterialItemInfo extends StackableItemInfo {}

export interface FoodItemInfo extends StackableItemInfo {
   readonly healAmount: number;
   readonly eatTime: number;
}

export type ToolType = "sword" | "bow" | "axe" | "pickaxe";

export interface ToolItemInfo extends BaseItemInfo {
   readonly toolType: ToolType;
   readonly damage: number;
   readonly knockback: number;
   /** Cooldown between attacks */
   readonly attackCooldown: number;
   /** Rough estimate of how powerful the item is. */
   readonly level: number;
}

export interface SwordItemInfo extends ToolItemInfo {
   readonly toolType: "sword";
}

export interface BowItemInfo extends BaseItemInfo {
   readonly projectileDamage: number;
   readonly projectileKnockback: number;
   readonly shotCooldownTicks: number;
   readonly projectileSpeed: number;
   /** The units of speed that the arrow's velocity gets decreased by each second */
   readonly airResistance: number;
   readonly level: number;
}

export interface AxeItemInfo extends ToolItemInfo {
   readonly toolType: "axe";
}

export interface PickaxeItemInfo extends ToolItemInfo {
   readonly toolType: "pickaxe";
}

export interface PlaceableItemInfo extends StackableItemInfo {
   readonly entityType: EntityType;
   readonly entityTypeConst: EntityTypeConst;
}

export interface BackpackItemInfo extends BaseItemInfo {
   /** Width of the backpack inventory in terms of item slots. */
   readonly inventoryWidth: number;
   /** Width of the backpack inventory in terms of item slots. */
   readonly inventoryHeight: number
   /** Rough estimate of how powerful the item is. */
   readonly level: number;
}

export interface ArmourItemInfo extends BaseItemInfo {
   readonly defence: number;
   /** Rough estimate of how powerful the item is. */
   readonly level: number;
}

export interface ItemInfoRecord {
   material: MaterialItemInfo;
   food: FoodItemInfo;
   sword: SwordItemInfo;
   bow: BowItemInfo;
   axe: AxeItemInfo;
   pickaxe: PickaxeItemInfo
   placeable: PlaceableItemInfo;
   backpack: BackpackItemInfo;
   armour: ArmourItemInfo;
}

export const ITEM_TYPE_RECORD = {
   [ItemType.wood]: "material",
   [ItemType.workbench]: "placeable",
   [ItemType.wooden_sword]: "sword",
   [ItemType.wooden_axe]: "axe",
   [ItemType.wooden_pickaxe]: "pickaxe",
   [ItemType.berry]: "food",
   [ItemType.raw_beef]: "food",
   [ItemType.cooked_beef]: "food",
   [ItemType.rock]: "material",
   [ItemType.stone_sword]: "sword",
   [ItemType.stone_axe]: "axe",
   [ItemType.stone_pickaxe]: "pickaxe",
   [ItemType.leather]: "material",
   [ItemType.leather_backpack]: "backpack",
   [ItemType.cactus_spine]: "material",
   [ItemType.yeti_hide]: "material",
   [ItemType.frostcicle]: "material",
   [ItemType.slimeball]: "material",
   [ItemType.eyeball]: "material",
   [ItemType.flesh_sword]: "sword",
   [ItemType.tribe_totem]: "placeable",
   [ItemType.tribe_hut]: "placeable",
   [ItemType.barrel]: "placeable",
   [ItemType.frost_armour]: "armour",
   [ItemType.campfire]: "placeable",
   [ItemType.furnace]: "placeable",
   [ItemType.wooden_bow]: "bow",
   [ItemType.meat_suit]: "armour",
   [ItemType.deepfrost_heart]: "material",
   [ItemType.deepfrost_sword]: "sword",
   [ItemType.deepfrost_pickaxe]: "pickaxe",
   [ItemType.deepfrost_axe]: "axe",
   [ItemType.deepfrost_armour]: "armour",
   [ItemType.raw_fish]: "food",
   [ItemType.cooked_fish]: "food",
   [ItemType.fishlord_suit]: "armour"
} satisfies Record<ItemType, keyof ItemInfoRecord>;

export type ItemInfo<T extends ItemType> = ItemInfoRecord[typeof ITEM_TYPE_RECORD[T]];

export const ITEM_INFO_RECORD: { [T in ItemType]: ItemInfo<T> } = {
   [ItemType.wood]: {
      stackSize: 99
   },
   [ItemType.workbench]: {
      stackSize: 99,
      entityType: EntityType.workbench,
      entityTypeConst: EntityTypeConst.workbench
   },
   [ItemType.wooden_sword]: {
      toolType: "sword",
      damage: 3,
      knockback: 150,
      attackCooldown: 0.3,
      level: 1
   },
   [ItemType.wooden_axe]: {
      toolType: "axe",
      damage: 3,
      knockback: 100,
      attackCooldown: 0.5,
      level: 1
   },
   [ItemType.wooden_pickaxe]: {
      toolType: "pickaxe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5,
      level: 1
   },
   [ItemType.berry]: {
      stackSize: 99,
      healAmount: 1,
      eatTime: 0.75
   },
   [ItemType.raw_beef]: {
      stackSize: 99,
      healAmount: 1,
      eatTime: 1.5
   },
   [ItemType.cooked_beef]: {
      stackSize: 99,
      healAmount: 5,
      eatTime: 1.5
   },
   [ItemType.rock]: {
      stackSize: 99
   },
   [ItemType.stone_sword]: {
      toolType: "sword",
      damage: 4,
      knockback: 150,
      attackCooldown: 0.3,
      level: 2
   },
   [ItemType.stone_axe]: {
      toolType: "axe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5,
      level: 2
   },
   [ItemType.stone_pickaxe]: {
      toolType: "pickaxe",
      damage: 8,
      knockback: 100,
      attackCooldown: 0.5,
      level: 2
   },
   [ItemType.leather]: {
      stackSize: 99
   },
   [ItemType.leather_backpack]: {
      inventoryWidth: 2,
      inventoryHeight: 2,
      level: 1
   },
   [ItemType.cactus_spine]: {
      stackSize: 99
   },
   [ItemType.yeti_hide]: {
      stackSize: 99
   },
   [ItemType.frostcicle]: {
      stackSize: 99
   },
   [ItemType.slimeball]: {
      stackSize: 99
   },
   [ItemType.eyeball]: {
      stackSize: 99
   },
   [ItemType.flesh_sword]: {
      toolType: "sword",
      damage: 2,
      knockback: 0,
      attackCooldown: 0.3,
      level: 1.5
   },
   [ItemType.tribe_totem]: {
      stackSize: 99,
      entityType: EntityType.tribe_totem,
      entityTypeConst: EntityTypeConst.tribe_totem
   },
   [ItemType.tribe_hut]: {
      stackSize: 99,
      entityType: EntityType.tribe_hut,
      entityTypeConst: EntityTypeConst.tribe_hut
   },
   [ItemType.barrel]: {
      stackSize: 99,
      entityType: EntityType.barrel,
      entityTypeConst: EntityTypeConst.barrel
   },
   [ItemType.frost_armour]: {
      defence: 0.25,
      level: 2
   },
   [ItemType.campfire]: {
      stackSize: 99,
      entityType: EntityType.campfire,
      entityTypeConst: EntityTypeConst.campfire
   },
   [ItemType.furnace]: {
      stackSize: 99,
      entityType: EntityType.furnace,
      entityTypeConst: EntityTypeConst.furnace
   },
   [ItemType.wooden_bow]: {
      projectileDamage: 4,
      projectileKnockback: 150,
      shotCooldownTicks: 1 * SETTINGS.TPS,
      projectileSpeed: 1100,
      airResistance: 400,
      level: 2
   },
   [ItemType.meat_suit]: {
      defence: 0,
      level: 1
   },
   [ItemType.deepfrost_heart]: {
      stackSize: 99
   },
   [ItemType.deepfrost_sword]: {
      toolType: "sword",
      damage: 7,
      knockback: 170,
      attackCooldown: 0.3,
      level: 3
   },
   [ItemType.deepfrost_pickaxe]: {
      toolType: "pickaxe",
      damage: 13,
      knockback: 100,
      attackCooldown: 0.5,
      level: 3
   },
   [ItemType.deepfrost_axe]: {
      toolType: "axe",
      damage: 8,
      knockback: 100,
      attackCooldown: 0.5,
      level: 3
   },
   [ItemType.deepfrost_armour]: {
      defence: 0.4,
      level: 3
   },
   [ItemType.raw_fish]: {
      stackSize: 99,
      eatTime: 2,
      healAmount: 1
   },
   [ItemType.cooked_fish]: {
      stackSize: 99,
      eatTime: 1.5,
      healAmount: 4
   },
   [ItemType.fishlord_suit]: {
      defence: 0.1,
      level: 1
   }
};

// Some typescript wizardry
type ExcludeNonPlaceableItemTypes<T extends ItemType> = typeof ITEM_TYPE_RECORD[T] extends "placeable" ? T : never;
export type PlaceableItemType = keyof {
   [T in ItemType as ExcludeNonPlaceableItemTypes<T>]: T;
}
type ExcludeNonArmourItemTypes<T extends ItemType> = typeof ITEM_TYPE_RECORD[T] extends "armour" ? T : never;
export type ArmourItemType = keyof {
   [T in ItemType as ExcludeNonArmourItemTypes<T>]: T;
}