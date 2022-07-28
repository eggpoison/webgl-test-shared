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