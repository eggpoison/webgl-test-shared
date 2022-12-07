export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow" | "zombie" | "tombstone" | "player";
type NarrowEntityType<E extends EntityType> = E;
export type MobType = NarrowEntityType<"cow" | "zombie">;

export enum CowSpecies {
   brown,
   black
}

export type HitboxType = "circular" | "rectangular";

interface BaseHitboxInfo<T extends HitboxType> {
   readonly type: T;
}

export interface CircularHitboxInfo extends BaseHitboxInfo<"circular"> {
   readonly type: "circular";
   readonly radius: number;
}

export interface RectangularHitboxInfo extends BaseHitboxInfo<"rectangular"> {
   readonly type: "rectangular";
   readonly width: number;
   readonly height: number;
}

interface HitboxTypesRecord {
   circular: () => CircularHitboxInfo,
   rectangular: () => RectangularHitboxInfo
}
export type HitboxInfo<T extends HitboxType> = ReturnType<HitboxTypesRecord[T]>;

type BaseEntityInfo = {
   readonly category: "mob" | "resource" | "other";
   readonly hitbox: HitboxInfo<HitboxType>;
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

export const ENTITY_INFO_RECORD: Record<EntityType, EntityInfo> = {
   cow: {
      category: "mob",
      behaviour: "passive",
      hitbox: {
         type: "rectangular",
         width: 50,
         height: 100
      }
   },
   zombie: {
      category: "mob",
      behaviour: "hostile",
      hitbox: {
         type: "circular",
         radius: 32,
      }
   },
   tombstone: {
      category: "other",
      hitbox: {
         type: "rectangular",
         width: 64,
         height: 64
      }
   },
   player: {
      category: "other",
      hitbox: {
         type: "circular",
         radius: 32
      }
   }
};

export interface EntityInfoClientArgs {
   cow: (species: CowSpecies) => void;
   zombie: (zombieType: number) => void;
   tombstone: (tombstoneType: number) => void;
   player: (displayName: string) => void;
};