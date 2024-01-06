import { BiomeName } from "./tiles";

export enum TribeType {
   plainspeople,
   barbarians,
   frostlings,
   goblins
}

interface TribeInfo {
   readonly maxHealthPlayer: number;
   readonly maxHealthWorker: number;
   // @Cleanup: Client doesn't need to know this
   readonly biomes: ReadonlyArray<BiomeName>;
   readonly baseTribesmanCap: number;
   readonly moveSpeedMultiplier: number;
}

export const TRIBE_INFO_RECORD: Record<TribeType, TribeInfo> = {
   [TribeType.plainspeople]: {
      maxHealthPlayer: 20,
      maxHealthWorker: 14,
      biomes: ["grasslands"],
      baseTribesmanCap: 4,
      moveSpeedMultiplier: 1
   },
   [TribeType.barbarians]: {
      maxHealthPlayer: 25,
      maxHealthWorker: 18,
      biomes: ["desert"],
      baseTribesmanCap: 2,
      moveSpeedMultiplier: 0.8
   },
   [TribeType.frostlings]: {
      maxHealthPlayer: 20,
      maxHealthWorker: 14,
      biomes: ["tundra"],
      baseTribesmanCap: 4,
      moveSpeedMultiplier: 1
   },
   [TribeType.goblins]: {
      maxHealthPlayer: 15,
      maxHealthWorker: 10,
      biomes: ["grasslands", "desert", "tundra"],
      baseTribesmanCap: 8,
      moveSpeedMultiplier: 1
   }
};