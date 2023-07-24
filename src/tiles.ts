export type BiomeName = "grasslands" | "desert" | "tundra" | "swamp" | "mountains" | "magmaFields";

// excuse the terrible formatting, I'm tired
export type TileType =
   "grass" |
   "dirt" |
   "water" |
   "sludge" |
   "slime" |
   "rock" |
   "sand" |
   "sandstone" |
   "snow" |
   "ice" |
   "permafrost" |
   "magma" |
"lava";

export type TileTypeInfo = {
   readonly isLiquid: boolean;
   /** How quickly an entity loses velocity on the tile (1 = instant, 0 = no loss) */
   readonly friction: number;
   readonly moveSpeedMultiplier?: number;
   readonly walkDamage?: number;
}

export const TILE_TYPE_INFO_RECORD: Record<TileType, TileTypeInfo> = {
   grass: {
      isLiquid: false,
      friction: 0.65
   },
   dirt: {
      isLiquid: false,
      friction: 0.65
   },
   water: {
      isLiquid: true,
      friction: 0.65
   },
   sludge: {
      isLiquid: false,
      friction: 0.9,
      moveSpeedMultiplier: 0.8
   },
   slime: {
      isLiquid: false,
      friction: 1,
      moveSpeedMultiplier: 0.4
   },
   rock: {
      isLiquid: false,
      friction: 0.65
   },
   sand: {
      isLiquid: false,
      friction: 0.65
   },
   sandstone: {
      isLiquid: false,
      friction: 0.65
   },
   snow: {
      isLiquid: false,
      friction: 0.9,
      moveSpeedMultiplier: 0.65
   },
   ice: {
      isLiquid: false,
      friction: 0.2,
      moveSpeedMultiplier: 1.5
   },
   permafrost: {
      isLiquid: false,
      friction: 0.65
   },
   magma: {
      isLiquid: false,
      friction: 0.65
   },
   lava: {
      isLiquid: true,
      friction: 0.85
   }
};

export interface TileInfo {
   type: TileType;
   biomeName: BiomeName;
   isWall: boolean;
}