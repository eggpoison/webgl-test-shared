import { InventoryData } from "./client-server-types";
import { ItemType } from "./items";
import { TribeType } from "./tribes";

export type EntityBehaviour = "passive" | "neutral" | "hostile";

export enum EntityType {
   cow,
   zombie,
   tombstone,
   tree,
   workbench,
   boulder,
   berryBush,
   cactus,
   yeti,
   iceSpikes,
   slime,
   slimewisp,
   player,
   tribeWorker,
   tribeWarrior,
   tribeTotem,
   workerHut,
   warriorHut,
   barrel,
   campfire,
   furnace,
   snowball,
   krumblid,
   frozenYeti,
   fish,
   itemEntity,
   woodenArrowProjectile,
   iceShardProjectile,
   rockSpikeProjectile,
   spearProjectile,
   researchBench
}

export const enum IEntityType {
   cow,
   zombie,
   tombstone,
   tree,
   workbench,
   boulder,
   berryBush,
   cactus,
   yeti,
   iceSpikes,
   slime,
   slimewisp,
   player,
   tribeWorker,
   tribeWarrior,
   tribeTotem,
   workerHut,
   warriorHut,
   barrel,
   campfire,
   furnace,
   snowball,
   krumblid,
   frozenYeti,
   fish,
   itemEntity,
   woodenArrowProjectile,
   iceShardProjectile,
   rockSpikeProjectile,
   spearProjectile,
   researchBench
}
   
export const RESOURCE_ENTITY_TYPES: ReadonlyArray<EntityType> = [EntityType.tree, EntityType.berryBush, EntityType.iceSpikes, EntityType.cactus, EntityType.boulder];
export const MOB_ENTITY_TYPES: ReadonlyArray<EntityType> = [EntityType.cow, EntityType.zombie, EntityType.yeti, EntityType.slime, EntityType.slimewisp, EntityType.krumblid, EntityType.frozenYeti];

// export const RESOURCE_ENTITY_TYPES_CONST: ReadonlyArray<IEntityType> = [IEntityType.tree, IEntityType.berry_bush, EntityTypeConst.ice_spikes,EntityTypeConst.cactus, EntityTypeConst.boulder];
// export const MOB_ENTITY_TYPES_CONST: ReadonlyArray<IEntityType> = [IEntityType.cow, IEntityType.zombie, EntityTypeConst.yeti, EntityTypeConst.slime, EntityTypeConst.slimewisp, EntityTypeConst.krumblid, EntityTypeConst.frozen_yeti];

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
   fish,
   spear
}

export interface DeathInfo {
   readonly username: string;
   readonly causeOfDeath: PlayerCauseOfDeath;
}

export enum TribeMemberAction {
   chargeBow,
   chargeSpear,
   researching,
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

export enum TribesmanState {
   chasing,
   escaping,
   normal
}

export enum RockSpikeProjectileSize {
   small,
   medium,
   large
}

// @Cleanup: Maybe send data based on the components
// cons:
// - would send all data regardless of whether it is useful or not
// pros:
// - faster development time
// - doesn't require defining an extra protocol for which data is sent (like with the EntityInfoClientArgs)
// - allows easily inspecting specific entity data

export const EntityInfoClientArgs = {
   [EntityType.cow]: (species: CowSpecies, grazeProgress: number) => {},
   [EntityType.zombie]: (zombieType: number, activeItemType: ItemType | null, lastActionTicks: number, action: TribeMemberAction) => {},
   [EntityType.tombstone]: (tombstoneType: number, zombieSpawnProgress: number, zombieSpawnX: number, zombieSpawnY: number, deathInfo: DeathInfo | null) => {},
   [EntityType.tree]: (treeSize: TreeSize) => {},
   [EntityType.workbench]: () => {},
   [EntityType.boulder]: (boulderType: number) => {},
   [EntityType.berryBush]: (numBerries: number) => {},
   [EntityType.cactus]: (flowers: ReadonlyArray<CactusBodyFlowerData>, limbs: ReadonlyArray<CactusLimbData>) => {},
   [EntityType.yeti]: (attackProgress: number) => {},
   [EntityType.iceSpikes]: () => {},
   [EntityType.slime]: (size: SlimeSize, eyeRotation: number, orbs: ReadonlyArray<SlimeOrbData>, anger: number) => {},
   [EntityType.slimewisp]: () => {},
   [EntityType.player]:    (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, activeItem: ItemType | null, action: TribeMemberAction, foodEatingType: ItemType | -1, lastActionTicks: number, hasFrostShield: boolean, warPaintType: number, username: string) => {},
   [EntityType.tribeWorker]: (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, activeItem: ItemType | null, action: TribeMemberAction, foodEatingType: ItemType | -1, lastActionTicks: number, hasFrostShield: boolean, warPaintType: number, hotbarInventory: InventoryData, activeItemSlot: number, state: TribesmanState) => {},
   [EntityType.tribeWarrior]: (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, activeItem: ItemType | null, action: TribeMemberAction, foodEatingType: ItemType | -1, lastActionTicks: number, hasFrostShield: boolean, warPaintType: number, hotbarInventory: InventoryData, activeItemSlot: number, state: TribesmanState) => {},
   [EntityType.tribeTotem]: (tribeID: number, tribeType: TribeType, banners: Array<TribeTotemBanner>) => {},
   [EntityType.workerHut]: (tribeID: number | null, lastDoorSwingTicks: number) => {},
   [EntityType.warriorHut]: (tribeID: number | null, lastDoorSwingTicks: number) => {},
   [EntityType.barrel]: (tribeID: number | null, inventory: InventoryData) => {},
   [EntityType.campfire]: (fuelInventory: InventoryData, ingredientInventory: InventoryData, outputInventory: InventoryData, heatingProgress: number, isCooking: boolean) => {},
   [EntityType.furnace]:  (fuelInventory: InventoryData, ingredientInventory: InventoryData, outputInventory: InventoryData, heatingProgress: number, isCooking: boolean) => {},
   [EntityType.snowball]: (size: SnowballSize) => {},
   [EntityType.krumblid]: () => {},
   [EntityType.frozenYeti]: (attackType: FrozenYetiAttackType, attackStage: number, stageProgress: number, rockSpikePositions: Array<[number, number]>) => {},
   [EntityType.fish]: (colour: FishColour) => {},
   [EntityType.itemEntity]: (itemType: ItemType) => {},
   [EntityType.woodenArrowProjectile]: () => {},
   [EntityType.iceShardProjectile]: () => {},
   [EntityType.rockSpikeProjectile]: (size: RockSpikeProjectileSize, lifetime: number) => {},
   [EntityType.spearProjectile]: () => {},
   [EntityType.researchBench]: () => {}
} satisfies Record<EntityType, (...args: any[]) => void>;