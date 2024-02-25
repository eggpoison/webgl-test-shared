import { InventoryData, StatusEffectData, BlueprintBuildingType } from "./client-server-types";
import { CactusBodyFlowerData, CactusLimbData, CowSpecies, DeathInfo, DoorToggleType, FishColour, FrozenYetiAttackType, GenericArrowType, RockSpikeProjectileSize, SlimeSize, SnowballSize, TreeSize, TribeMemberAction, TribeTotemBanner } from "./entities";
import { BallistaAmmoType, ItemType } from "./items";
import { SETTINGS } from "./settings";
import { StatusEffectConst } from "./status-effects";
import { TribeType } from "./tribes";

export interface AIHelperComponentData {
   readonly visionRange: number;
}

export interface ArrowStatusEffectInfo {
   readonly type: StatusEffectConst;
   readonly durationTicks: number;
}

export interface ArrowComponentData {}

export interface BerryBushComponentData {
   readonly numBerries: number;
}

export interface BlueprintComponentData {
   readonly buildingType: BlueprintBuildingType;
   readonly buildProgress: number;
}

export interface BoulderComponentData {
   readonly boulderType: number;
}

export interface CactusComponentData {
   readonly flowers: ReadonlyArray<CactusBodyFlowerData>;
   readonly limbs: ReadonlyArray<CactusLimbData>;
}

export interface CookingComponentData {
   readonly heatingProgress: number;
   readonly isCooking: boolean;
}

export interface CowComponentData {
   readonly species: CowSpecies;
   readonly grazeProgress: number;
}

export interface DoorComponentData {
   readonly toggleType: DoorToggleType;
   readonly openProgress: number;
}

export interface FishComponentData {
   readonly colour: FishColour;
}

export interface FrozenYetiComponentData {
   readonly attackType: FrozenYetiAttackType;
   readonly attackStage: number;
   readonly stageProgress: number;
   readonly rockSpikePositions: Array<[number, number]>;
}

export interface GolemComponentData {
   readonly wakeProgress: number;
}

export interface HealthComponentData {
   readonly health: number;
   readonly maxHealth: number;
}

export interface HutComponentData {
   readonly lastDoorSwingTicks: number;
}

export interface IceShardComponentData {}

export interface IceSpikesComponentData {}

export interface InventoryComponentData {
   readonly inventories: Record<string, InventoryData>;
}

// @Cleanup: Merge with server definition
export interface InventoryUseInfoData {
   selectedItemSlot: number;
   readonly inventory: InventoryData;
   bowCooldownTicks: number;
   readonly itemAttackCooldowns: Record<number, number>;
   readonly spearWindupCooldowns: Record<number, number>;
   readonly crossbowLoadProgressRecord: Record<number, number>;
   foodEatingTimer: number;
   // @Cleanup: Type name should not be 'tribe member action' as non tribe members can have this component
   currentAction: TribeMemberAction;
   lastAttackTicks: number;
   lastEatTicks: number;
   // @Cleanup: May be able to merge all 3 of these into 1
   lastBowChargeTicks: number;
   lastSpearChargeTicks: number;
   lastBattleaxeChargeTicks: number;
   lastCrossbowLoadTicks: number;
   thrownBattleaxeItemID: number;
}

export interface InventoryUseComponentData {
   readonly inventoryUseInfos: Array<InventoryUseInfoData>;
}

export interface ItemComponentData {
   readonly itemType: ItemType;
}

export interface PebblumComponentData {}

export interface PhysicsComponentData {}

export interface PlayerComponentData {
   readonly username: string;
}

export interface RockSpikeProjectileComponentData {
   readonly size: RockSpikeProjectileSize;
   readonly lifetime: number;
}

export interface SlimeComponentData {
   readonly size: SlimeSize;
   readonly eyeRotation: number;
   readonly orbSizes: ReadonlyArray<SlimeSize>;
   readonly anger: number;
   readonly spitChargeProgress: number;
}

export interface SlimeSpitComponentData {
   readonly size: number;
}

export interface SlimewispComponentData {}

export interface SnowballComponentData {
   readonly size: SnowballSize;
}

export interface StatusEffectComponentData {
   readonly statusEffects: Array<StatusEffectData>;
}

export interface ThrowingProjectileComponentData {}

export interface TombstoneComponentData {
   readonly tombstoneType: number;
   readonly zombieSpawnProgress: number;
   readonly zombieSpawnX: number;
   readonly zombieSpawnY: number;
   readonly deathInfo: DeathInfo | null;
}

export interface TotemBannerComponentData {
   readonly banners: Array<TribeTotemBanner>;
}

export interface TreeComponentData {
   readonly treeSize: TreeSize;
}

export interface TribeComponentData {
   readonly tribeID: number | null;
   readonly tribeType: TribeType | null;
}

export interface TribeMemberComponentData {
   readonly warPaintType: number;
}

export interface TribesmanComponentData {}

export interface TurretComponentData {
   readonly aimDirection: number;
   readonly chargeProgress: number;
   readonly reloadProgress: number;
}

export interface YetiComponentData {
   readonly attackProgress: number;
}

export interface ZombieComponentData {
   readonly zombieType: number;
}

export interface BallistaComponentData {
   readonly ammoType: BallistaAmmoType;
   readonly ammoRemaining: number;
}

// @Cleanup: Should these be here?

export interface GenericAmmoInfo {
   readonly type: GenericArrowType;
   readonly damage: number;
   readonly knockback: number;
   readonly shotCooldownTicks: number;
   readonly reloadTimeTicks: number;
   readonly projectileSpeed: number;
   readonly hitboxWidth: number;
   readonly hitboxHeight: number;
   readonly ammoMultiplier: number;
   readonly statusEffect: ArrowStatusEffectInfo | null;
}

export const AMMO_INFO_RECORD: Record<BallistaAmmoType, GenericAmmoInfo> = {
   [ItemType.wood]: {
      type: GenericArrowType.woodenBolt,
      damage: 5,
      knockback: 150,
      shotCooldownTicks: 2.5 * SETTINGS.TPS,
      reloadTimeTicks: Math.floor(0.4 * SETTINGS.TPS),
      projectileSpeed: 1100,
      hitboxWidth: 12,
      hitboxHeight: 80,
      ammoMultiplier: 3,
      statusEffect: null
   },
   [ItemType.rock]: {
      type: GenericArrowType.ballistaRock,
      damage: 8,
      knockback: 350,
      shotCooldownTicks: 3 * SETTINGS.TPS,
      reloadTimeTicks: Math.floor(0.5 * SETTINGS.TPS),
      projectileSpeed: 1000,
      hitboxWidth: 12,
      hitboxHeight: 80,
      ammoMultiplier: 3,
      statusEffect: null
   },
   [ItemType.slimeball]: {
      type: GenericArrowType.ballistaSlimeball,
      damage: 3,
      knockback: 0,
      shotCooldownTicks: 2 * SETTINGS.TPS,
      reloadTimeTicks: Math.floor(0.4 * SETTINGS.TPS),
      projectileSpeed: 800,
      hitboxWidth: 12,
      hitboxHeight: 80,
      ammoMultiplier: 4,
      statusEffect: {
         type: StatusEffectConst.poisoned,
         durationTicks: 2.5 * SETTINGS.TPS
      }
   },
   [ItemType.frostcicle]: {
      type: GenericArrowType.ballistaFrostcicle,
      damage: 1,
      knockback: 50,
      shotCooldownTicks: 0.5 * SETTINGS.TPS,
      reloadTimeTicks: Math.floor(0.15 * SETTINGS.TPS),
      projectileSpeed: 1500,
      hitboxWidth: 12,
      hitboxHeight: 80,
      ammoMultiplier: 6,
      statusEffect: {
         type: StatusEffectConst.freezing,
         durationTicks: 1 * SETTINGS.TPS
      }
   }
}