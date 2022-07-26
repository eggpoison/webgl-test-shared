import { Biome } from "./biomes";

export enum TileType {
   grass,
   dirt,
   water,
   sludge,
   rock,
   sand,
   sandstone,
   snow,
   ice,
   magma,
   lava
}

type TileEffects = {
   readonly moveSpeedMultiplier?: number;
   readonly walkDamage?: number;
   // readonly statusEffectOnWalk?: {
   //    readonly type: StatusEffectType;
   //    readonly duration: number;
   // }
}

type TileTypeInfo = {
   readonly textureSource: string;
   /** How quickly an entity loses velocity on the tile (1 = instant, 0 = no loss) */
   readonly friction: number;
   readonly effects?: TileEffects;
}

const DEFAULT_FRICTION = 0.5;

export const TILE_TYPE_INFO_RECORD: { [key in TileType]: TileTypeInfo } = {
   [TileType.grass]: {
      textureSource: "grass.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.dirt]: {
      textureSource: "dirt.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.water]: {
      textureSource: "water.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.sludge]: {
      textureSource: "grass.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.rock]: {
      textureSource: "rock.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.sand]: {
      textureSource: "grass.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.sandstone]: {
      textureSource: "grass.png",
      friction: DEFAULT_FRICTION
   },
   [TileType.snow]: {
      textureSource: "grass.png",
      friction: 0.7
   },
   [TileType.ice]: {
      textureSource: "grass.png",
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
};

export interface TileInfo {
   type: TileType;
   biome: Biome;
   isWall: boolean;
}

class Tile implements TileInfo {
   public readonly type: TileType;
   public readonly biome: Biome;
   public readonly isWall: boolean;

   constructor({ type, biome, isWall }: TileInfo) {
      this.type = type;
      this.biome = biome;
      this.isWall = isWall;
   }
}

export default Tile;