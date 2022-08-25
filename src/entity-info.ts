export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow" | "player";

type BaseEntityInfo = {
   readonly category: "mob" | "resource" | "other";
   readonly clientArgs?: ReadonlyArray<unknown>;
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
      behaviour: "passive"
   },
   player: {
      category: "other"
   }
};

export interface EntityInfoClientArgs {
   player: (displayName: string) => void,
   cow: () => void
};