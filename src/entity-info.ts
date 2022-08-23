export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow" | "player";

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

export const ENTITY_INFO_RECORD: Record<EntityType, MobEntityInfo | ResourceEntityInfo | OtherEntityInfo> = {
   cow: {
      category: "mob",
      behaviour: "passive"
   },
   player: {
      category: "other"
   }
};