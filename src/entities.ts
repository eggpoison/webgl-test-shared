import { InventoryData } from "./client-server-types";
import { ItemType } from "./items";
import { TribeType } from "./tribes";

export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow"
   | "zombie"
   | "tombstone"
   | "tree"
   | "workbench"
   | "boulder"
   | "berry_bush"
   | "cactus"
   | "yeti"
   | "ice_spikes"
   | "slime"
   | "slimewisp"
   | "tribesman"
   | "player"
   | "tribe_totem"
   | "tribe_hut"
   | "barrel"
   | "campfire"
   | "furnace"
   | "snowball"
   | "krumblid"
   | "frozen_yeti"
   | "fish";
   
export const RESOURCE_ENTITY_TYPES: ReadonlyArray<EntityType> = ["tree", "berry_bush", "ice_spikes", "cactus", "boulder"];
export const MOB_ENTITY_TYPES: ReadonlyArray<EntityType> = ["cow", "zombie", "yeti", "slime", "slimewisp", "krumblid", "frozen_yeti"];

type BaseEntityInfo = {
   readonly category: "mob" | "resource" | "other";
}

interface MobEntityInfo extends BaseEntityInfo {
   readonly category: "mob";
   readonly behaviour: EntityBehaviour;
}

interface ResourceEntityInfo extends BaseEntityInfo {
   readonly category: "resource";
}

interface OtherEntityInfo extends BaseEntityInfo {
   readonly category: "other";
}

export type EntityInfo = MobEntityInfo | ResourceEntityInfo | OtherEntityInfo;

export enum CowSpecies {
   brown,
   black
}

export enum TreeSize {
   small,
   large
}

export enum CactusFlowerSize {
   small = 0,
   large = 1
}

export interface CactusFlowerData {
   readonly type: number;
   readonly height: number;
   readonly rotation: number;
}

export interface CactusBodyFlowerData extends CactusFlowerData {
   readonly size: CactusFlowerSize
   readonly column: number;
}

export interface CactusLimbFlowerData extends CactusFlowerData {
   readonly direction: number;
}

export interface CactusLimbData {
   readonly direction: number;
   readonly flower?: CactusLimbFlowerData;
}

export enum SlimeSize {
   small = 0,
   medium = 1,
   large = 2
}

/** Information about an orb inside a slime */
export interface SlimeOrbData {
   readonly size: SlimeSize;
   readonly rotation: number;
   /** Offset of the orb from the center of the slime (from 0->1) */
   readonly offset: number;
}

export interface TribeTotemBanner {
   readonly hutNum: number;
   /** The ring layer in the totem which the banner is on */
   readonly layer: number;
   readonly direction: number;
}

export enum SnowballSize {
   small,
   large
}

export const SNOWBALL_SIZES: Record<SnowballSize, number> = {
   [SnowballSize.small]: 44,
   [SnowballSize.large]: 60
};

export enum PlayerCauseOfDeath {
   yeti,
   zombie,
   berry_bush,
   poison,
   fire,
   tribe_member,
   arrow,
   ice_spikes,
   ice_shards,
   cactus,
   snowball,
   slime,
   god,
   frozen_yeti,
   bloodloss,
   rock_spike,
   lack_of_oxygen,
   fish
}

export interface DeathInfo {
   readonly username: string;
   readonly causeOfDeath: PlayerCauseOfDeath;
}

export enum TribeMemberAction {
   charge_bow,
   eat,
   none
}

export enum FrozenYetiAttackType {
   snowThrow,
   roar,
   stomp,
   bite,
   none
}

export enum FishColour {
   blue,
   gold,
   red,
   lime
}

// @Cleanup (???): Make all of these things into structures
export interface EntityInfoClientArgs {
   cow: (species: CowSpecies, grazeProgress: number) => void;
   zombie: (zombieType: number) => void;
   tombstone: (tombstoneType: number, zombieSpawnProgress: number, zombieSpawnX: number, zombieSpawnY: number, deathInfo: DeathInfo | null) => void;
   tree: (treeSize: TreeSize) => void;
   workbench: () => void;
   boulder: (boulderType: number) => void;
   berry_bush: (numBerries: number) => void;
   cactus: (flowers: ReadonlyArray<CactusBodyFlowerData>, limbs: ReadonlyArray<CactusLimbData>) => void;
   yeti: (attackProgress: number) => void;
   ice_spikes: () => void;
   slime: (size: SlimeSize, eyeRotation: number, orbs: ReadonlyArray<SlimeOrbData>, anger: number) => void;
   slimewisp: () => void;
   // @Cleanup: Maybe foodEatingType can be removed, just use activeItemType instead
   // @Cleanup: rework this stuff. Maybe combine the tribesman and player data, and figure out better system for lastAttackTicks and lastEatTicks
   // @Cleanup: don't send backpack inventory for players.
   tribesman: (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, activeItem: ItemType | null, action: TribeMemberAction, foodEatingType: ItemType | -1, lastActionTicks: number, hasFrostShield: boolean, warPaintType: number, hotbarInventory: InventoryData, activeItemSlot: number) => void;
   player:    (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, activeItem: ItemType | null, action: TribeMemberAction, foodEatingType: ItemType | -1, lastActionTicks: number, hasFrostShield: boolean, warPaintType: number, username: string) => void;
   tribe_totem: (tribeID: number, tribeType: TribeType, banners: Array<TribeTotemBanner>) => void;
   tribe_hut: (tribeID: number) => void;
   barrel: (tribeID: number | null, inventory: InventoryData) => void;
   campfire: (fuelInventory: InventoryData, ingredientInventory: InventoryData, outputInventory: InventoryData, heatingProgress: number, isCooking: boolean) => void;
   furnace:  (fuelInventory: InventoryData, ingredientInventory: InventoryData, outputInventory: InventoryData, heatingProgress: number, isCooking: boolean) => void;
   snowball: (size: SnowballSize) => void;
   krumblid: () => void;
   frozen_yeti: (attackType: FrozenYetiAttackType, attackStage: number, stageProgress: number, rockSpikePositions: Array<[number, number]>) => void;
   fish: (colour: FishColour) => void;
};