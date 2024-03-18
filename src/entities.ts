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
   wall,
   slimeSpit,
   spitPoison,
   door,
   battleaxeProjectile,
   golem,
   planterBox,
   iceArrow,
   pebblum,
   embrasure,
   tunnel,
   spikes,
   punjiSticks,
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
   wall,
   slimeSpit,
   spitPoison,
   door,
   battleaxeProjectile,
   golem,
   planterBox,
   iceArrow,
   pebblum,
   embrasure,
   tunnel,
   spikes,
   punjiSticks,
   blueprintEntity,
   ballista,
   slingTurret
}
   
export const RESOURCE_ENTITY_TYPES: ReadonlyArray<EntityType> = [EntityType.tree, EntityType.berryBush, EntityType.iceSpikes, EntityType.cactus, EntityType.boulder];
export const MOB_ENTITY_TYPES: ReadonlyArray<EntityType> = [EntityType.cow, EntityType.zombie, EntityType.yeti, EntityType.slime, EntityType.slimewisp, EntityType.krumblid, EntityType.frozenYeti];

export const RESOURCE_ENTITY_TYPES_CONST: ReadonlyArray<IEntityType> = [IEntityType.tree, IEntityType.berryBush, IEntityType.iceSpikes, IEntityType.cactus, IEntityType.boulder];

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

export const STRUCTURE_TYPES =       [EntityType.wall,  EntityType.door,  EntityType.embrasure,  EntityType.spikes,  EntityType.punjiSticks,  EntityType.ballista,  EntityType.slingTurret,  EntityType.tunnel,  EntityType.tribeTotem,  EntityType.workerHut,  EntityType.warriorHut,  EntityType.barrel] as const;
export const STRUCTURE_TYPES_CONST = [IEntityType.wall, IEntityType.door, IEntityType.embrasure, IEntityType.spikes, IEntityType.punjiSticks, IEntityType.ballista, IEntityType.slingTurret, IEntityType.tunnel, IEntityType.tribeTotem, IEntityType.workerHut, IEntityType.warriorHut, IEntityType.barrel] as const;

export type StructureType = typeof STRUCTURE_TYPES[number];
export type StructureTypeConst = typeof STRUCTURE_TYPES_CONST[number];

export function getSnapOffsetWidth(entityType: StructureTypeConst, _isPlacedOnWall: boolean): number {
   switch (entityType) {
      case IEntityType.tunnel:
      case IEntityType.wall:
      case IEntityType.door:
      case IEntityType.embrasure: { return 64; }
      case IEntityType.spikes: { return 56; }
      case IEntityType.punjiSticks: { return 56; }
      case IEntityType.slingTurret: { return 40; }
      case IEntityType.ballista: { return 50; }
      case IEntityType.tribeTotem: return 120;
      case IEntityType.workerHut: return 88;
      case IEntityType.warriorHut: return 104;
      case IEntityType.barrel: return 80;
   }
}

export function getSnapOffsetHeight(entityType: StructureTypeConst, isPlacedOnWall: boolean): number {
   switch (entityType) {
      case IEntityType.tunnel:
      case IEntityType.wall:
      case IEntityType.door:
      case IEntityType.embrasure: { return 64; }
      case IEntityType.spikes: { return isPlacedOnWall ? 28 : 56; }
      case IEntityType.punjiSticks: { return isPlacedOnWall ? 32 : 56; }
      case IEntityType.slingTurret: { return 40; }
      case IEntityType.ballista: { return 50; }
      case IEntityType.tribeTotem: return 120;
      case IEntityType.workerHut: return 88;
      case IEntityType.warriorHut: return 104;
      case IEntityType.barrel: return 80;
   }
}