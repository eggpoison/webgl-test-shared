import { InventoryData, ItemData, BlueprintBuildingType } from "./client-server-types";
import { BallistaAmmoType, ItemType } from "./items";
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
   researchBench,
   woodenWall,
   slimeSpit,
   spitPoison,
   woodenDoor,
   battleaxeProjectile,
   golem,
   planterBox,
   iceArrow,
   pebblum,
   woodenEmbrasure,
   woodenFloorSpikes,
   woodenWallSpikes,
   floorPunjiSticks,
   wallPunjiSticks,
   blueprintEntity,
   ballista,
   slingTurret
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
   researchBench,
   woodenWall,
   slimeSpit,
   spitPoison,
   woodenDoor,
   battleaxeProjectile,
   golem,
   planterBox,
   iceArrow,
   pebblum,
   woodenEmbrasure,
   woodenFloorSpikes,
   woodenWallSpikes,
   floorPunjiSticks,
   wallPunjiSticks,
   blueprintEntity,
   ballista,
   slingTurret
}
   
export const RESOURCE_ENTITY_TYPES: ReadonlyArray<EntityType> = [EntityType.tree, EntityType.berryBush, EntityType.iceSpikes, EntityType.cactus, EntityType.boulder];
export const MOB_ENTITY_TYPES: ReadonlyArray<EntityType> = [EntityType.cow, EntityType.zombie, EntityType.yeti, EntityType.slime, EntityType.slimewisp, EntityType.krumblid, EntityType.frozenYeti];

export const RESOURCE_ENTITY_TYPES_CONST: ReadonlyArray<IEntityType> = [IEntityType.tree, IEntityType.berryBush, IEntityType.iceSpikes, IEntityType.cactus, IEntityType.boulder];
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

// @Cleanup: Rename to something like HitCause
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
   // @Cleanup: Maybe we can combine all 3 of these into one?
   chargeBow,
   chargeSpear,
   chargeBattleaxe,
   loadCrossbow,
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

export enum DoorToggleType {
   none,
   close,
   open
}

export enum GenericArrowType {
   woodenArrow,
   woodenBolt,
   ballistaRock,
   ballistaSlimeball,
   ballistaFrostcicle,
   slingRock
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
   [EntityType.slime]: (size: SlimeSize, eyeRotation: number, orbs: ReadonlyArray<SlimeOrbData>, anger: number, spitChargeProgress: number) => {},
   [EntityType.slimewisp]: () => {},
   [EntityType.player]:    (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, rightActiveItem: ItemData | null, rightAction: TribeMemberAction, rightFoodEatingType: ItemType | -1, rightLastActionTicks: number, rightThrownBattleaxeItemID, leftActiveItem: ItemData | null, leftAction: TribeMemberAction, leftFoodEatingType: ItemType | -1, leftLastActionTicks: number, leftThrownBattleaxeItemID: number, hasFrostShield: boolean, warPaintType: number, username: string) => {},
   [EntityType.tribeWorker]: (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, rightActiveItem: ItemData | null, rightAction: TribeMemberAction, rightFoodEatingType: ItemType | -1, rightLastActionTicks: number, rightThrownBattleaxeItemID, leftActiveItem: ItemData | null, leftAction: TribeMemberAction, leftFoodEatingType: ItemType | -1, leftLastActionTicks: number, leftThrownBattleaxeItemID: number, hasFrostShield: boolean, warPaintType: number, hotbarInventory: InventoryData, activeItemSlot: number, state: TribesmanState) => {},
   [EntityType.tribeWarrior]: (tribeID: number | null, tribeType: TribeType, armourSlotInventory: InventoryData, backpackSlotInventory: InventoryData, backpackInventory: InventoryData, rightActiveItem: ItemData | null, rightAction: TribeMemberAction, rightFoodEatingType: ItemType | -1, rightLastActionTicks: number, rightThrownBattleaxeItemID, leftActiveItem: ItemData | null, leftAction: TribeMemberAction, leftFoodEatingType: ItemType | -1, leftLastActionTicks: number, leftThrownBattleaxeItemID: number, hasFrostShield: boolean, warPaintType: number, hotbarInventory: InventoryData, activeItemSlot: number, state: TribesmanState) => {},
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
   [EntityType.woodenArrowProjectile]: (arrowType: GenericArrowType) => {},
   [EntityType.iceShardProjectile]: () => {},
   [EntityType.rockSpikeProjectile]: (size: RockSpikeProjectileSize, lifetime: number) => {},
   [EntityType.spearProjectile]: () => {},
   [EntityType.researchBench]: () => {},
   [EntityType.woodenWall]: (health: number) => {},
   [EntityType.slimeSpit]: (size: number) => {},
   [EntityType.spitPoison]: () => {},
   [EntityType.woodenDoor]: (toggleType: DoorToggleType, openProgress: number) => {},
   [EntityType.battleaxeProjectile]: () => {},
   [EntityType.golem]: (wakeProgress: number) => {},
   [EntityType.planterBox]: () => {},
   [EntityType.iceArrow]: () => {},
   [EntityType.pebblum]: () => {},
   [EntityType.woodenEmbrasure]: () => {},
   [EntityType.woodenFloorSpikes]: () => {},
   [EntityType.woodenWallSpikes]: () => {},
   [EntityType.floorPunjiSticks]: () => {},
   [EntityType.wallPunjiSticks]: () => {},
   [EntityType.blueprintEntity]: (buildingType: BlueprintBuildingType, buildProgress: number) => {},
   [EntityType.ballista]: (tribeID: number | null, aimDirection: number, chargeProgress: number, reloadProgress: number, ammoBoxInventory: InventoryData, ammoType: BallistaAmmoType, ammoRemaining: number) => {},
   [EntityType.slingTurret]: (tribeID: number | null, aimDirection: number, chargeProgress: number, reloadProgress: number) => {}
} satisfies Record<EntityType, (...args: any[]) => void>;

export const STRUCTURE_TYPES = [EntityType.woodenWall, EntityType.woodenDoor, EntityType.woodenEmbrasure, EntityType.woodenFloorSpikes, EntityType.woodenWallSpikes, EntityType.floorPunjiSticks, EntityType.wallPunjiSticks, EntityType.ballista, EntityType.slingTurret] as const;
export const STRUCTURE_TYPES_CONST = [IEntityType.woodenWall, IEntityType.woodenDoor, IEntityType.woodenEmbrasure, IEntityType.woodenFloorSpikes, IEntityType.woodenWallSpikes, IEntityType.floorPunjiSticks, IEntityType.wallPunjiSticks, IEntityType.ballista, IEntityType.slingTurret] as const;

export type StructureType = typeof STRUCTURE_TYPES[number];
export type StructureTypeConst = typeof STRUCTURE_TYPES_CONST[number];

export const SNAP_OFFSETS: Record<StructureTypeConst, number> = {
   [IEntityType.woodenWall]: 64,
   [IEntityType.woodenDoor]: 64,
   [IEntityType.woodenEmbrasure]: 64,
   [IEntityType.woodenFloorSpikes]: 56,
   [IEntityType.woodenWallSpikes]: 28,
   [IEntityType.floorPunjiSticks]: 56,
   [IEntityType.wallPunjiSticks]: 32,
   [IEntityType.slingTurret]: 40,
   [IEntityType.ballista]: 50
};