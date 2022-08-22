export type EntityType = "passive" | "neutral" | "hostile" | "resource";

type BaseEntityInfo = {
   readonly name: string;
   readonly id: number;
   readonly type: EntityType;
}

export const ENTITY_INFO_RECORD: ReadonlyArray<BaseEntityInfo> = [
   {
      name: "cow",
      id: 0,
      type: "passive"
   }
];