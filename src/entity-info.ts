export type EntityBehaviour = "passive" | "neutral" | "hostile";

export type EntityType = "cow"
   | "zombie"
   | "tombstone"
   | "player"
   | "tree"
   | "workbench"
   | "boulder"
   | "berry_bush"
   | "cactus";
type NarrowEntityType<E extends EntityType> = E;
export type MobType = NarrowEntityType<"cow" | "zombie">;
export type ResourceType = NarrowEntityType<"tree">;

export enum CowSpecies {
   brown,
   black
}

export enum TreeSize {
   small,
   large
}

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

export type EntityInfo = MobEntityInfo | ResourceEntityInfo | OtherEntityInfo;

export const ENTITY_INFO_RECORD: Record<EntityType, EntityInfo> = {
   cow: {
      category: "mob",
      behaviour: "passive"
   },
   zombie: {
      category: "mob",
      behaviour: "hostile"
   },
   tombstone: {
      category: "other"
   },
   player: {
      category: "other"
   },
   tree: {
      category: "resource"
   },
   workbench: {
      category: "other"
   },
   boulder: {
      category: "resource"
   },
   berry_bush: {
      category: "resource"
   },
   cactus: {
      category: "resource"
   }
};

export enum CactusFlowerType {
   pinkGreen,
   pinkRed,
   white,
   pinkYellow,
   yellow
}

export type CactusFlowerPositions = ReadonlyArray<[column: number, height: number]>

export interface EntityInfoClientArgs {
   cow: (species: CowSpecies) => void;
   zombie: (zombieType: number) => void;
   tombstone: (tombstoneType: number) => void;
   player: (username: string) => void;
   tree: (treeSize: TreeSize) => void;
   workbench: () => void;
   boulder: (boulderType: number) => void;
   berry_bush: (numBerries: number) => void;
   cactus: (flowers: ReadonlyArray<CactusFlowerType>, flowerPositions: CactusFlowerPositions) => void;
};