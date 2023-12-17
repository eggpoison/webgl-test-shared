interface SettingsType {
   /** The number of times that the game ticks every second */
   readonly TPS: number;
   /** Size of a tile */
   readonly TILE_SIZE: number;
   /** Width and height of the board in chunks */
   readonly BOARD_SIZE: number;
   /** Number of tiles in the width and height of a chunk */
   readonly CHUNK_SIZE: number;
   /** Number of units in the width and height of a chunk */
   CHUNK_UNITS: number;
   /** Width and height of the board in tiles */
   BOARD_DIMENSIONS: number;
   /** Width and height of the board in units */
   BOARD_UNITS: number;
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
   /** Maximum push force an entity can experience from 1 collision */
   readonly ENTITY_PUSH_FORCE: number;
   /** The amount of in-game seconds that pass in one real second */
   readonly TIME_PASS_RATE: number;
   /** The number of player slots that the player has */
   readonly INITIAL_PLAYER_HOTBAR_SIZE: number;
   /** Distance that placeable items are placed from the player */
   readonly ITEM_PLACE_DISTANCE: number;
   /** Determines the amount of friction that entities experience. */
   readonly FRICTION_CONSTANT: number;
   /** Minimum number of seconds between attacks */
   readonly DEFAULT_ATTACK_COOLDOWN: number;
   /** Number of tiles from the edge of the border that edge terrain is generated */
   readonly EDGE_GENERATION_DISTANCE: number;
}

export const SETTINGS: SettingsType = {
   TPS: 60,
   TILE_SIZE: 64,
   BOARD_SIZE: 40,
   // BOARD_SIZE: 64,
   CHUNK_SIZE: 4,
   CHUNK_UNITS: -1,
   BOARD_DIMENSIONS: -1,
   BOARD_UNITS: -1,
   // @Cleanup: Only needs to be client-side
   BACKGROUND_COLOUR: "#09120b",
   // @Cleanup: Only needs to be server-side
   START_TIME: 8,
   // @Cleanup: Do we use this?
   ENTITY_INVULNERABILITY_DURATION: 0.15,
   // @Cleanup: Only needs to be client-side
   WALL_OUTLINE_WIDTH: 5,
   SERVER_PORT: 8000,
   ITEM_SIZE: 16,
   ENTITY_PUSH_FORCE: 200,
   // @Cleanup: Does this need to be shared? I think only server uses it
   TIME_PASS_RATE: 300,
   INITIAL_PLAYER_HOTBAR_SIZE: 7,
   ITEM_PLACE_DISTANCE: 60,
   FRICTION_CONSTANT: 50,
   DEFAULT_ATTACK_COOLDOWN: 0.3,
   EDGE_GENERATION_DISTANCE: 16
};

SETTINGS.CHUNK_UNITS = SETTINGS.CHUNK_SIZE * SETTINGS.TILE_SIZE;
SETTINGS.BOARD_DIMENSIONS = SETTINGS.BOARD_SIZE * SETTINGS.CHUNK_SIZE;
SETTINGS.BOARD_UNITS = SETTINGS.BOARD_DIMENSIONS * SETTINGS.TILE_SIZE;