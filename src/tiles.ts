export type BiomeName = "grasslands" | "desert" | "tundra" | "swamp" | "mountains" | "magmaFields";

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
      friction: 0.75
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
      friction: 0.8,
      moveSpeedMultiplier: 0.65
   },
   ice: {
      isLiquid: false,
      friction: 0.3,
      moveSpeedMultiplier: 1.3
   },
   permafrost: {
      isLiquid: false,
      friction: 0.5
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