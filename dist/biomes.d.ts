import { TileInfo } from "./Tile";
export declare type BiomeName = "grasslands" | "desert" | "tundra" | "swamp" | "mountains" | "magmaFields";
declare type TileGenerationInfo = {
    readonly info: Omit<TileInfo, "biome" | "fogAmount">;
    readonly minWeight?: number;
    readonly maxWeight?: number;
    /** The minimum number of tiles from the end of the biome */
    readonly minDist?: number;
    /** The maximum number of tiles from the end of the biome */
    readonly maxDist?: number;
};
declare type BiomeGenerationInfo = {
    readonly minHeight?: number;
    readonly maxHeight?: number;
    readonly minTemperature?: number;
    readonly maxTemperature?: number;
    readonly minHumidity?: number;
    readonly maxHumidity?: number;
};
declare type Biome = {
    readonly name: BiomeName;
    readonly generationInfo?: Readonly<BiomeGenerationInfo>;
    readonly tiles: ReadonlyArray<TileGenerationInfo>;
};
declare const BIOMES: ReadonlyArray<Biome>;
export default BIOMES;
//# sourceMappingURL=biomes.d.ts.map