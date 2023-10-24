export type BiomeName = "grasslands" | "desert" | "tundra" | "swamp" | "mountains" | "river";

export enum TileType {
   grass,
   dirt,
   water,
   sludge,
   slime,
   rock,
   darkRock,
   sand,
   sandstone,
   snow,
   ice,
   permafrost,
   magma,
   lava,
   fimbultur
}
export const ALL_TILE_TYPES: ReadonlyArray<TileType> = [TileType.grass, TileType.dirt, TileType.water, TileType.sludge, TileType.slime, TileType.rock, TileType.darkRock, TileType.sand, TileType.sandstone, TileType.snow, TileType.ice, TileType.permafrost, TileType.magma, TileType.lava, TileType.fimbultur];

//                                                                 grass dirt  water sludge slime rock  darkRock sand  sandstone snow  ice  permafrost magma lava  fimbultur 
export const TILE_FRICTIONS: ReadonlyArray<number>              = [0.65, 0.65, 0.65, 0.9,   1,    0.65, 0.65,    0.65, 0.65,     0.9,  0.2, 0.65,      0.65, 0.85, 0.65];
export const TILE_MOVE_SPEED_MULTIPLIERS: ReadonlyArray<number> = [1,    1,    0.6,  0.75,  0.3,  1,    1,       1,    1,        0.65, 1.5, 1,         1,    1,    1];

export interface TileInfo {
   type: TileType;
   biomeName: BiomeName;
   isWall: boolean;
}