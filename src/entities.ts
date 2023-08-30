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
   | "snowball";
export const RESOURCE_TYPES: ReadonlyArray<EntityType> = ["tree", "berry_bush", "ice_spikes", "cactus", "boulder"];

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
   yeti = 0,
   zombie = 1,
   berry_bush = 2,
   poison = 3,
   fire = 4,
   tribe_member = 5,
   arrow = 6,
   ice_spikes = 7,
   ice_shards = 8,
   cactus = 9,
   snowball = 10,
   slime = 11,
   god = 12
}

export interface DeathInfo {
   readonly username: string;
   readonly causeOfDeath: PlayerCauseOfDeath;
}

export interface EntityInfoClientArgs {
   cow: (species: CowSpecies) => void;
   zombie: (zombieType: number) => void;
   tombstone: (tombstoneType: number, deathInfo: DeathInfo | null) => void;
   tree: (treeSize: TreeSize) => void;
   workbench: () => void;
   boulder: (boulderType: number) => void;
   berry_bush: (numBerries: number) => void;
   cactus: (flowers: ReadonlyArray<CactusBodyFlowerData>, limbs: ReadonlyArray<CactusLimbData>) => void;
   yeti: (attackProgress: number) => void;
   ice_spikes: () => void;
   slime: (size: SlimeSize, eyeRotation: number, orbs: ReadonlyArray<SlimeOrbData>) => void;
   slimewisp: () => void;
   // TODO: rework this stuff. Maybe combine the tribesman and player data, and figure out better system for lastAttackTicks and lastEatTicks
   tribesman: (tribe: number | null, tribeType: TribeType, armour: ItemType | null, activeItem: ItemType | null, lastAttackTicks: number, lastEatTicks: number, inventory: InventoryData) => void;
   player: (tribe: number | null, tribeType: TribeType, armour: ItemType | null, activeItem: ItemType | null, lastAttackTicks: number, lastEatTicks: number, username: string) => void;
   tribe_totem: (tribe: number, tribeType: TribeType, banners: Array<TribeTotemBanner>) => void;
   tribe_hut: (tribe: number) => void;
   barrel: (tribe: number | null, inventory: InventoryData) => void;
   campfire: (fuelInventory: InventoryData, ingredientInventory: InventoryData, outputInventory: InventoryData) => void;
   furnace: (fuelInventory: InventoryData, ingredientInventory: InventoryData, outputInventory: InventoryData) => void;
   snowball: (size: SnowballSize) => void;
};