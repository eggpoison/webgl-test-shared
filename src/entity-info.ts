export type EntityType = "passive" | "neutral" | "hostile" | "resource";

type EntityInfo = {
   readonly type: EntityType;
}

export type EntityName = "cow";

export const ENTITY_INFO_RECORD: Record<EntityName, EntityInfo> = {
   cow: {
      type: "passive"
   }
};