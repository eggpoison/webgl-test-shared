import { BiomeName } from "./biomes";

// excuse the terrible formatting, I'm tired
export type TileType =
   "grass" |
   "dirt" |
   "water" |
   "sludge" |
   "rock" |
   "sand" |
   "sandstone" |
   "snow" |
   "ice" |
   "magma" |
"lava";

export type TileTypeInfo = {
   /** How quickly an entity loses velocity on the tile (1 = instant, 0 = no loss) */
   readonly friction: number;
   readonly moveSpeedMultiplier?: number;
   readonly walkDamage?: number;
   // readonly statusEffectOnWalk?: {
   //    readonly type: StatusEffectType;
   //    readonly duration: number;
   // }
}

export const TILE_TYPE_INFO_RECORD: Record<TileType, TileTypeInfo> = {
   grass: {
      friction: 0.5
   },
   dirt: {
      friction: 0.5
   },
   water: {
      friction: 0.5
   },
   sludge: {
      friction: 0.75
   },
   rock: {
      friction: 0.5
   },
   sand: {
      friction: 0.5
   },
   sandstone: {
      friction: 0.5
   },
   snow: {
      friction: 0.75
   },
   ice: {
      friction: 0.15,
      moveSpeedMultiplier: 1.25
   },
   magma: {
      friction: 0.5
   },
   lava: {
      friction: 0.85
   }
};

export interface TileInfo {
   type: TileType;
   biome: BiomeName;
   isWall: boolean;
}

export class Tile implements TileInfo {
   public readonly type: TileType;
   public readonly biome: BiomeName;
   public readonly isWall: boolean;

   constructor({ type, biome, isWall }: TileInfo) {
      this.type = type;
      this.biome = biome;
      this.isWall = isWall;
   }
}