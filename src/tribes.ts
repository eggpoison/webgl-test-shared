import { BiomeName } from "./tiles";

export enum TribeType {
   plainspeople,
   barbarians,
   frostlings
}

interface TribeInfo {
   readonly maxHealth: number;
   readonly biome: BiomeName;
}

const TRIBE_INFO_RECORD: Record<TribeType, TribeInfo> = {
   [TribeType.plainspeople]: {
      maxHealth: 20,
      biome: "grasslands"
   },
   [TribeType.barbarians]: {
      maxHealth: 25,
      biome: "desert"
   },
   [TribeType.frostlings]: {
      maxHealth: 20,
      biome: "tundra"
   }
};

export default TRIBE_INFO_RECORD;