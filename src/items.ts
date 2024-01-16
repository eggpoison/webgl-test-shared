import { EntityType, IEntityType } from "./entities";
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
   worker_hut,
   warrior_hut,
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
   fishlord_suit,
   gathering_gloves,
   throngler,
   leather_armour,
   spear,
   paper,
   research_bench,
   wooden_wall,
   wooden_hammer,
   stone_battleaxe,
   living_rock,
   planter_box,
   reinforced_bow,
   crossbow,
   ice_bow
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

// @Cleanup: Is this necessary?
export type ToolType = "sword" | "bow" | "axe" | "pickaxe" | "spear" | "hammer" | "battleaxe";

export interface ToolItemInfo extends StackableItemInfo {
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

export interface CrossbowItemInfo extends BowItemInfo {}

export interface AxeItemInfo extends ToolItemInfo {
   readonly toolType: "axe";
}

export interface PickaxeItemInfo extends ToolItemInfo {
   readonly toolType: "pickaxe";
}

export interface HammerItemInfo extends ToolItemInfo {
   readonly toolType: "hammer";
}

export interface PlaceableItemInfo extends StackableItemInfo {
   readonly entityType: EntityType;
   readonly entityTypeConst: IEntityType;
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

export interface GloveItemInfo extends BaseItemInfo {
   readonly level: number;
}

export interface SpearItemInfo extends ToolItemInfo {}

export interface BattleaxeItemInfo extends ToolItemInfo {}

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
   glove: GloveItemInfo;
   spear: SpearItemInfo;
   hammer: HammerItemInfo;
   battleaxe: BattleaxeItemInfo;
   crossbow: CrossbowItemInfo;
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
   [ItemType.worker_hut]: "placeable",
   [ItemType.warrior_hut]: "placeable",
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
   [ItemType.fishlord_suit]: "armour",
   [ItemType.gathering_gloves]: "glove",
   [ItemType.throngler]: "sword",
   [ItemType.leather_armour]: "armour",
   [ItemType.spear]: "spear",
   [ItemType.paper]: "material",
   [ItemType.research_bench]: "placeable",
   [ItemType.wooden_wall]: "placeable",
   [ItemType.wooden_hammer]: "hammer",
   [ItemType.stone_battleaxe]: "battleaxe",
   [ItemType.living_rock]: "material",
   [ItemType.planter_box]: "placeable",
   [ItemType.reinforced_bow]: "bow",
   [ItemType.crossbow]: "crossbow",
   [ItemType.ice_bow]: "bow"
} satisfies Record<ItemType, keyof ItemInfoRecord>;

export type ItemInfo<T extends ItemType> = ItemInfoRecord[typeof ITEM_TYPE_RECORD[T]];

export const ITEM_INFO_RECORD: { [T in ItemType]: ItemInfo<T> } = {
   [ItemType.wood]: {
      stackSize: 99
   },
   [ItemType.workbench]: {
      stackSize: 99,
      entityType: EntityType.workbench,
      entityTypeConst: IEntityType.workbench
   },
   [ItemType.wooden_sword]: {
      stackSize: 1,
      toolType: "sword",
      damage: 2,
      knockback: 150,
      attackCooldown: 0.3,
      level: 1
   },
   [ItemType.wooden_axe]: {
      stackSize: 1,
      toolType: "axe",
      damage: 3,
      knockback: 100,
      attackCooldown: 0.5,
      level: 1
   },
   [ItemType.wooden_pickaxe]: {
      stackSize: 1,
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
      stackSize: 1,
      toolType: "sword",
      damage: 3,
      knockback: 150,
      attackCooldown: 0.3,
      level: 2
   },
   [ItemType.stone_axe]: {
      stackSize: 1,
      toolType: "axe",
      damage: 5,
      knockback: 100,
      attackCooldown: 0.5,
      level: 2
   },
   [ItemType.stone_pickaxe]: {
      stackSize: 1,
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
      stackSize: 1,
      toolType: "sword",
      damage: 2,
      knockback: 0,
      attackCooldown: 0.3,
      level: 1.5
   },
   [ItemType.tribe_totem]: {
      stackSize: 99,
      entityType: EntityType.tribeTotem,
      entityTypeConst: IEntityType.tribeTotem
   },
   [ItemType.worker_hut]: {
      stackSize: 99,
      entityType: EntityType.workerHut,
      entityTypeConst: IEntityType.workerHut
   },
   [ItemType.warrior_hut]: {
      stackSize: 99,
      entityType: EntityType.warriorHut,
      entityTypeConst: IEntityType.warriorHut
   },
   [ItemType.barrel]: {
      stackSize: 99,
      entityType: EntityType.barrel,
      entityTypeConst: IEntityType.barrel
   },
   [ItemType.frost_armour]: {
      defence: 0.25,
      level: 2
   },
   [ItemType.campfire]: {
      stackSize: 99,
      entityType: EntityType.campfire,
      entityTypeConst: IEntityType.campfire
   },
   [ItemType.furnace]: {
      stackSize: 99,
      entityType: EntityType.furnace,
      entityTypeConst: IEntityType.furnace
   },
   [ItemType.wooden_bow]: {
      projectileDamage: 4,
      projectileKnockback: 150,
      shotCooldownTicks: 1 * SETTINGS.TPS,
      projectileSpeed: 1100,
      airResistance: 400,
      level: 2
   },
   [ItemType.reinforced_bow]: {
      projectileDamage: 6,
      projectileKnockback: 200,
      shotCooldownTicks: 1 * SETTINGS.TPS,
      projectileSpeed: 1500,
      airResistance: 300,
      level: 2.5
   },
   [ItemType.ice_bow]: {
      projectileDamage: 0,
      projectileKnockback: 0,
      shotCooldownTicks: 1.25 * SETTINGS.TPS,
      projectileSpeed: 1100,
      airResistance: 400,
      level: 2.5
   },
   [ItemType.crossbow]: {
      projectileDamage: 6,
      projectileKnockback: 200,
      shotCooldownTicks: 1 * SETTINGS.TPS,
      projectileSpeed: 1500,
      airResistance: 300,
      level: 2.5
   },
   [ItemType.meat_suit]: {
      defence: 0,
      level: 1
   },
   [ItemType.deepfrost_heart]: {
      stackSize: 99
   },
   [ItemType.deepfrost_sword]: {
      stackSize: 1,
      toolType: "sword",
      damage: 4,
      knockback: 170,
      attackCooldown: 0.3,
      level: 3
   },
   [ItemType.deepfrost_pickaxe]: {
      stackSize: 1,
      toolType: "pickaxe",
      damage: 13,
      knockback: 100,
      attackCooldown: 0.5,
      level: 3
   },
   [ItemType.deepfrost_axe]: {
      stackSize: 1,
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
   },
   [ItemType.gathering_gloves]: {
      level: 1
   },
   [ItemType.throngler]: {
      stackSize: 1,
      toolType: "sword",
      damage: 2,
      knockback: 400,
      attackCooldown: 0.5,
      level: 2.5
   },
   [ItemType.leather_armour]: {
      defence: 0.1,
      level: 1
   },
   [ItemType.spear]: {
      stackSize: 99,
      toolType: "spear",
      damage: 4,
      knockback: 300,
      attackCooldown: 0.8,
      level: 2.5
   },
   [ItemType.paper]: {
      stackSize: 99
   },
   [ItemType.research_bench]: {
      stackSize: 99,
      entityType: EntityType.researchBench,
      entityTypeConst: IEntityType.researchBench
   },
   [ItemType.wooden_wall]: {
      stackSize: 99,
      entityType: EntityType.woodenWall,
      entityTypeConst: IEntityType.woodenWall
   },
   [ItemType.wooden_hammer]: {
      stackSize: 1,
      toolType: "hammer",
      damage: 2,
      knockback: 150,
      attackCooldown: 0.7,
      level: 1
   },
   [ItemType.stone_battleaxe]: {
      stackSize: 1,
      toolType: "battleaxe",
      damage: 3,
      knockback: 150,
      attackCooldown: 0.5,
      level: 2.5
   },
   [ItemType.living_rock]: {
      stackSize: 99
   },
   [ItemType.planter_box]: {
      stackSize: 99,
      entityType: EntityType.planterBox,
      entityTypeConst: IEntityType.planterBox
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
type ExcludeNonGloveItemTypes<T extends ItemType> = typeof ITEM_TYPE_RECORD[T] extends "glove" ? T : never;
export type GloveItemType = keyof {
   [T in ItemType as ExcludeNonGloveItemTypes<T>]: T;
}

export type ItemSlot = Item | null;

/** Stores the items inside an inventory, indexed by their slot number. */
export type ItemSlots = { [itemSlot: number]: Item };

export interface Inventory {
   itemSlots: ItemSlots;
   width: number;
   height: number;
   readonly inventoryName: string;
}

export class Item {
   /** Unique identifier for the item */
   public readonly id: number;
   
   public type: ItemType;
   public count: number;

   constructor(itemType: ItemType, count: number, id: number) {
      this.type = itemType;
      this.count = count;
      this.id = id;
   }
}

/**
 * Checks whether a given item type is able to be stacked.
 * @param itemType The type of item to check.
 * @returns Whether the item type is able to be stacked.
 */
export function itemIsStackable(itemType: ItemType): boolean {
   return ITEM_INFO_RECORD[itemType].hasOwnProperty("stackSize");
}

export function getItemStackSize(item: Item): number {
   return (ITEM_INFO_RECORD[item.type] as StackableItemInfo).stackSize;
}