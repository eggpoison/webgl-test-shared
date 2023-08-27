import { EntityType } from "./entities";

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
}

export interface SwordItemInfo extends ToolItemInfo {
   readonly toolType: "sword";
}

export interface BowItemInfo extends ToolItemInfo {
   readonly toolType: "bow";
   readonly projectileDamage: number;
   readonly projectileKnockback: number;
   readonly projectileAttackCooldown: number;
   readonly projectileSpeed: number;
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
   readonly defence: number;
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
   [ItemType.wooden_bow]: "bow"
} satisfies Record<ItemType, keyof ItemInfoRecord>;

export type ItemInfo<T extends ItemType> = ItemInfoRecord[typeof ITEM_TYPE_RECORD[T]];

export const ITEM_INFO_RECORD: { [T in ItemType]: ItemInfo<T> } = {
   [ItemType.wood]: {
      stackSize: 99
   },
   [ItemType.workbench]: {
      stackSize: 99,
      entityType: "workbench"
   },
   [ItemType.wooden_sword]: {
      toolType: "sword",
      damage: 3,
      knockback: 150,
      attackCooldown: 0.3
   },
   [ItemType.wooden_axe]: {
      toolType: "axe",
      damage: 3,
      knockback: 100,
      attackCooldown: 0.5
   },
   [ItemType.wooden_pickaxe]: {
      toolType: "pickaxe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5
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
      damage: 5,
      knockback: 150,
      attackCooldown: 0.3
   },
   [ItemType.stone_axe]: {
      toolType: "axe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5
   },
   [ItemType.stone_pickaxe]: {
      toolType: "pickaxe",
      damage: 8,
      knockback: 100,
      attackCooldown: 0.5
   },
   [ItemType.leather]: {
      stackSize: 99
   },
   [ItemType.leather_backpack]: {
      inventoryWidth: 2,
      inventoryHeight: 2
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
      attackCooldown: 0.3
   },
   [ItemType.tribe_totem]: {
      stackSize: 99,
      entityType: "tribe_totem"
   },
   [ItemType.tribe_hut]: {
      stackSize: 99,
      entityType: "tribe_hut"
   },
   [ItemType.barrel]: {
      stackSize: 99,
      entityType: "barrel"
   },
   [ItemType.frost_armour]: {
      defence: 0.25
   },
   [ItemType.campfire]: {
      stackSize: 99,
      entityType: "campfire"
   },
   [ItemType.furnace]: {
      stackSize: 99,
      entityType: "furnace"
   },
   [ItemType.wooden_bow]: {
      toolType: "bow",
      damage: 1,
      knockback: 50,
      attackCooldown: 0.3,
      projectileDamage: 3,
      projectileKnockback: 150,
      projectileAttackCooldown: 1,
      projectileSpeed: 750
   }
};