export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow" | "player";

export enum CowSpecies {
   brown,
   black
}

export type CircularHitbox = {
   readonly type: "circular";
   readonly radius: number;
}

export type RectangularHitbox = {
   readonly type: "rectangular";
   readonly width: number;
   readonly height: number;
}

export type Hitbox = CircularHitbox | RectangularHitbox;

type BaseEntityInfo = {
   readonly category: "mob" | "resource" | "other";
   readonly hitbox: Hitbox;
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
         width: 56,
         height: 128
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