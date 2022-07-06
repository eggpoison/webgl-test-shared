import { BiomeName } from "./biomes";
export declare enum TileType {
    grass = 0,
    dirt = 1,
    water = 2,
    sludge = 3,
    rock = 4,
    sand = 5,
    sandstone = 6,
    snow = 7,
    ice = 8,
    magma = 9,
    lava = 10
}
declare type TileEffects = {
    readonly moveSpeedMultiplier?: number;
    readonly walkDamage?: number;
};
declare type TileTypeInfo = {
    readonly textureSource: string;
    /** How quickly an entity loses velocity on the tile (1 = instant, 0 = maintains) */
    readonly friction: number;
    readonly effects?: TileEffects;
};
export declare const TILE_TYPE_INFO_RECORD: {
    [key in TileType]: TileTypeInfo;
};
export interface TileInfo {
    readonly type: TileType;
    readonly biome: BiomeName;
    readonly isWall: boolean;
}
declare class Tile implements TileInfo {
    readonly type: TileType;
    readonly biome: BiomeName;
    readonly isWall: boolean;
    constructor({ type, biome, isWall }: TileInfo);
}
export default Tile;
//# sourceMappingURL=Tile.d.ts.map