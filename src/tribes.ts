import { BiomeName } from "./tiles";

export enum TribeType {
   plainspeople,
   barbarians,
   frostlings,
   goblins
}

interface TribeInfo {
   readonly maxHealth: number;
   readonly biomes: ReadonlyArray<BiomeName>;
   readonly baseTribesmanCap: number;
}

const TRIBE_INFO_RECORD: Record<TribeType, TribeInfo> = {
   [TribeType.plainspeople]: {
      maxHealth: 20,
      biomes: ["grasslands"],
      baseTribesmanCap: 4
   },
   [TribeType.barbarians]: {
      maxHealth: 25,
      biomes: ["desert"],
      baseTribesmanCap: 2
   },
   [TribeType.frostlings]: {
      maxHealth: 20,
      biomes: ["tundra"],
      baseTribesmanCap: 5
   },
   [TribeType.goblins]: {
      maxHealth: 15,
      biomes: ["grasslands", "desert", "tundra"],
      baseTribesmanCap: 8
   }
};

export default TRIBE_INFO_RECORD;