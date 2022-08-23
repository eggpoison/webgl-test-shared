import { Biome } from "./biomes";

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
   readonly friction: number;
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
      friction: 0.7
   },
   ice: {
      friction: 0.15
   },
   magma: {
      friction: 0.5
   },
   lava: {
      friction: 0.85
   }
};

/*
[TileType.grass]: {
      textureSource: "grass.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.dirt]: {
      textureSource: "dirt.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.water]: {
      colour: [0, 240, 228],
      friction: DEFAULT_FRICTION,
      isLiquid: true
   },
   [TileType.sludge]: {
      textureSource: "sludge.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.rock]: {
      textureSource: "rock.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.sand]: {
      textureSource: "sand.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.sandstone]: {
      textureSource: "sandstone.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.snow]: {
      textureSource: "snow.png",
      friction: 0.7
   },
   [TileType.ice]: {
      textureSource: "ice.png",
      friction: 0.15
   },
   [TileType.magma]: {
      textureSource: "grass.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.lava]: {
      textureSource: "grass.png",
      friction: 0.8
   }
*/

export interface TileInfo {
   type: TileType;
   biome: Biome;
   isWall: boolean;
}

export class Tile implements TileInfo {
   public readonly type: TileType;
   public readonly biome: Biome;
   public readonly isWall: boolean;

   constructor({ type, biome, isWall }: TileInfo) {
      this.type = type;
      this.biome = biome;
      this.isWall = isWall;
   }
}