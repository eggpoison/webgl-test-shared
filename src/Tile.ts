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
}

export const TILE_TYPE_INFO_RECORD: Record<TileType, TileTypeInfo> = {
   grass: {
      friction: 0.65
   },
   dirt: {
      friction: 0.65
   },
   water: {
      friction: 0.65
   },
   sludge: {
      friction: 0.75
   },
   rock: {
      friction: 0.65
   },
   sand: {
      friction: 0.65
   },
   sandstone: {
      friction: 0.65
   },
   snow: {
      friction: 0.8,
      moveSpeedMultiplier: 0.75
   },
   ice: {
      friction: 0.15,
      moveSpeedMultiplier: 1.3
   },
   magma: {
      friction: 0.65
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
   public readonly x: number;
   public readonly y: number;

   public type: TileType;
   public biome: BiomeName;
   public isWall: boolean;

   constructor(x: number, y: number, { type, biome, isWall }: TileInfo) {
      this.x = x;
      this.y = y;

      this.type = type;
      this.biome = biome;
      this.isWall = isWall;
   }
}