export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow" | "player";

export enum CowSpecies {
   brown,
   black
}

export type CircularHitboxInfo = {
   readonly type: "circular";
   readonly radius: number;
}

export type RectangularHitboxInfo = {
   readonly type: "rectangular";
   readonly width: number;
   readonly height: number;
}

export type HitboxInfo = CircularHitboxInfo | RectangularHitboxInfo;

type BaseEntityInfo = {
   readonly category: "mob" | "resource" | "other";
   readonly hitbox: HitboxInfo;
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
   player: {
      category: "other",
      hitbox: {
         type: "circular",
         radius: 32
      }
   }
};

export interface EntityInfoClientArgs {
   player: (displayName: string) => void,
   cow: (species: CowSpecies) => void
};