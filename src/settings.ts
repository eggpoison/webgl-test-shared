interface SettingsType {
   /** The number of times that the game ticks every second */
   readonly TPS: number;
   /** Size of a tile */
   readonly TILE_SIZE: number;
   /** Width and height of the board in chunks */
   readonly BOARD_SIZE: number;
   /** Number of tiles in the width and height of a chunk */
   readonly CHUNK_SIZE: number;
   /** Width and height of the board in tiles */
   DIMENSIONS: number;
   /** The colour of the background visible near the borders */
   readonly BACKGROUND_COLOUR: string;
   /** The game's starting time, in in-game hours */
   readonly START_TIME: number;
   /** The number of seconds it takes for fog of war to be revealed after the player steps on it */
   readonly FOG_REVEAL_TIME: number;
   /** How long an entity is invulnerable after being hit, in seconds */
   readonly ENTITY_INVULNERABILITY_DURATION: number;
   /** Whether the fog of war is shown */
   readonly SHOW_FOG_OF_WAR: boolean;
   /** The colour of wall outlines */
   readonly WALL_OUTLINE_WIDTH: number;
   /** Which port the server is hosted in */
   readonly SERVER_PORT: number;
}

export const SETTINGS: SettingsType = {
   TPS: 20,
   TILE_SIZE: 64,
   BOARD_SIZE: 8,
   CHUNK_SIZE: 8,
   DIMENSIONS: -1,
   START_TIME: 8,
   FOG_REVEAL_TIME: 0.5,
   ENTITY_INVULNERABILITY_DURATION: 0.15,
   SHOW_FOG_OF_WAR: false,
   BACKGROUND_COLOUR: "#09120b",
   WALL_OUTLINE_WIDTH: 5,
   SERVER_PORT: 8000
};

SETTINGS.DIMENSIONS = SETTINGS.BOARD_SIZE * SETTINGS.CHUNK_SIZE;