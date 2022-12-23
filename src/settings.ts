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
   BOARD_DIMENSIONS: number;
   /** The colour of the background visible near the borders */
   readonly BACKGROUND_COLOUR: string;
   /** The game's starting time, in in-game hours */
   readonly START_TIME: number;
   /** How long an entity is invulnerable after being hit, in seconds */
   readonly ENTITY_INVULNERABILITY_DURATION: number;
   /** The colour of wall outlines */
   readonly WALL_OUTLINE_WIDTH: number;
   /** Which port the server is hosted in */
   readonly SERVER_PORT: number;
   /** Size of the items in units */
   readonly ITEM_SIZE: number;
   /** The amount of in-game seconds that pass in one real second */
   readonly TIME_PASS_RATE: number;
   /** The number of player slots that the player has */
   readonly PLAYER_HOTBAR_SIZE: number;
}

export const SETTINGS: SettingsType = {
   TPS: 20,
   TILE_SIZE: 64,
   BOARD_SIZE: 8,
   CHUNK_SIZE: 8,
   BOARD_DIMENSIONS: -1,
   BACKGROUND_COLOUR: "#09120b",
   START_TIME: 8,
   ENTITY_INVULNERABILITY_DURATION: 0.15,
   WALL_OUTLINE_WIDTH: 5,
   SERVER_PORT: 8000,
   ITEM_SIZE: 16,
   TIME_PASS_RATE: 300,
   PLAYER_HOTBAR_SIZE: 7
};

SETTINGS.BOARD_DIMENSIONS = SETTINGS.BOARD_SIZE * SETTINGS.CHUNK_SIZE;