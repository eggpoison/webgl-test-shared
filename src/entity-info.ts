type EntityInfo = {
   readonly name: string;
   readonly id: number;
   readonly type: "passive" | "neutral" | "hostile";
}

export const ENTITY_INFO_RECORD: ReadonlyArray<EntityInfo> = [
   {
      name: "cow",
      id: 0,
      type: "passive"
   }
];