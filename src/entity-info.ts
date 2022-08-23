export type EntityBehaviour = "passive" | "neutral" | "hostile";

type BaseEntityInfo = {
   readonly category: "mob" | "resource";
}

interface MobEntityInfo extends BaseEntityInfo {
   readonly category: "mob";
   readonly behaviour: EntityBehaviour;
}

interface ResourceEntityInfo extends BaseEntityInfo {
   readonly category: "resource";
}

export type EntityType = "cow";

export const ENTITY_INFO_RECORD: Record<EntityType, MobEntityInfo | ResourceEntityInfo> = {
   cow: {
      category: "mob",
      behaviour: "passive"
   }
};