// @Memory: make into const and non-const enums as they can be stored with less memory
export type BiomeName = "grasslands" | "desert" | "tundra" | "swamp" | "mountains" | "magmaFields" | "river";

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
export const ALL_TILE_TYPES_CONST: ReadonlyArray<TileTypeConst> = [TileTypeConst.grass, TileTypeConst.dirt, TileTypeConst.water, TileTypeConst.sludge, TileTypeConst.slime, TileTypeConst.rock, TileTypeConst.darkRock, TileTypeConst.sand, TileTypeConst.sandstone, TileTypeConst.snow, TileTypeConst.ice, TileTypeConst.permafrost, TileTypeConst.magma, TileTypeConst.lava, TileTypeConst.fimbultur];

export const enum TileTypeConst {
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

//                                                                 grass dirt  water sludge slime rock  darkRock sand  sandstone snow  ice  permafrost magma lava  frost 
export const TILE_FRICTIONS: ReadonlyArray<number>              = [0.65, 0.65, 1,    0.9,   1,    0.65, 0.65,    0.65, 0.65,     0.9,  0.2, 0.65,      0.65, 0.85, 0.65];
export const TILE_MOVE_SPEED_MULTIPLIERS: ReadonlyArray<number> = [1,    1,    0.6,  0.75,  0.3,  1,    1,       1,    1,        0.65, 1.5, 1,         1,    1,    1];

export interface TileInfo {
   type: TileType;
   biomeName: BiomeName;
   isWall: boolean;
}

export interface TileInfoConst {
   type: TileTypeConst;
   biomeName: BiomeName;
   isWall: boolean;
}