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

export enum CactusFlowerType {
   pinkGreen,
   pinkRed,
   white,
   pinkYellow,
   yellow
}

export interface CactusFlowerData {
   readonly type: CactusFlowerType;
   readonly column: number;
   readonly height: number;
   readonly size: number;
}

export interface EntityInfoClientArgs {
   cow: (species: CowSpecies) => void;
   zombie: (zombieType: number) => void;
   tombstone: (tombstoneType: number) => void;
   player: (username: string) => void;
   tree: (treeSize: TreeSize) => void;
   workbench: () => void;
   boulder: (boulderType: number) => void;
   berry_bush: (numBerries: number) => void;
   cactus: (flowers: ReadonlyArray<CactusFlowerData>) => void;
};