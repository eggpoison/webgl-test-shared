const enum _Settings {
   SERVER_PORT = 8000,
   TPS = 60,
   I_TPS = 1 / TPS,
   TILE_SIZE = 64,
   BOARD_SIZE = 64,
   CHUNK_SIZE = 4,
   CHUNK_UNITS = CHUNK_SIZE * TILE_SIZE,
   BOARD_DIMENSIONS = BOARD_SIZE * CHUNK_SIZE,
   BOARD_UNITS = BOARD_DIMENSIONS * TILE_SIZE,
   ITEM_SIZE = 16,
   INITIAL_PLAYER_HOTBAR_SIZE = 7,
   ITEM_PLACE_DISTANCE = 60,
   DEFAULT_ATTACK_COOLDOWN = 0.3,
   EDGE_GENERATION_DISTANCE = 16,
   STRUCTURE_SNAP_RANGE = 100,
   STRUCTURE_POSITION_SNAP = 20,
   STRUCTURE_ROTATION_SNAP = 0.4,
   ENTITY_PUSH_FORCE = 20
}

export enum Settings {
   SERVER_PORT = _Settings.SERVER_PORT,
   TPS = _Settings.TPS,
   I_TPS = _Settings.I_TPS,
   TILE_SIZE = _Settings.TILE_SIZE,
   BOARD_SIZE = _Settings.BOARD_SIZE,
   CHUNK_SIZE = _Settings.CHUNK_SIZE,
   CHUNK_UNITS = _Settings.CHUNK_UNITS,
   BOARD_DIMENSIONS = _Settings.BOARD_DIMENSIONS,
   BOARD_UNITS = _Settings.BOARD_UNITS,
   ITEM_SIZE = _Settings.ITEM_SIZE,
   INITIAL_PLAYER_HOTBAR_SIZE = _Settings.INITIAL_PLAYER_HOTBAR_SIZE,
   ITEM_PLACE_DISTANCE = _Settings.ITEM_PLACE_DISTANCE,
   DEFAULT_ATTACK_COOLDOWN = _Settings.DEFAULT_ATTACK_COOLDOWN,
   EDGE_GENERATION_DISTANCE = _Settings.EDGE_GENERATION_DISTANCE,
   STRUCTURE_SNAP_RANGE = _Settings.STRUCTURE_SNAP_RANGE,
   STRUCTURE_POSITION_SNAP = _Settings.STRUCTURE_POSITION_SNAP,
   STRUCTURE_ROTATION_SNAP = _Settings.STRUCTURE_ROTATION_SNAP,
   ENTITY_PUSH_FORCE = _Settings.ENTITY_PUSH_FORCE
}

export const enum SettingsConst {
   SERVER_PORT = _Settings.SERVER_PORT,
   TPS = _Settings.TPS,
   I_TPS = _Settings.I_TPS,
   TILE_SIZE = _Settings.TILE_SIZE,
   BOARD_SIZE = _Settings.BOARD_SIZE,
   CHUNK_SIZE = _Settings.CHUNK_SIZE,
   CHUNK_UNITS = _Settings.CHUNK_UNITS,
   BOARD_DIMENSIONS = _Settings.BOARD_DIMENSIONS,
   BOARD_UNITS = _Settings.BOARD_UNITS,
   ITEM_SIZE = _Settings.ITEM_SIZE,
   INITIAL_PLAYER_HOTBAR_SIZE = _Settings.INITIAL_PLAYER_HOTBAR_SIZE,
   ITEM_PLACE_DISTANCE = _Settings.ITEM_PLACE_DISTANCE,
   DEFAULT_ATTACK_COOLDOWN = _Settings.DEFAULT_ATTACK_COOLDOWN,
   EDGE_GENERATION_DISTANCE = _Settings.EDGE_GENERATION_DISTANCE,
   STRUCTURE_SNAP_RANGE = _Settings.STRUCTURE_SNAP_RANGE,
   STRUCTURE_POSITION_SNAP = _Settings.STRUCTURE_POSITION_SNAP,
   STRUCTURE_ROTATION_SNAP = _Settings.STRUCTURE_ROTATION_SNAP,
   ENTITY_PUSH_FORCE = _Settings.ENTITY_PUSH_FORCE
}

export enum PathfindingSettings {
   /** Units of separation between the nodes horizontally and vertically */
   NODE_SEPARATION = 16,
   // @Robustness @Cleanup: Once merged with the laptop with SettingsConst, change from 16386 to SettingsConst.BOARD_UNITS
   NODES_IN_WORLD_WIDTH = 16384 / PathfindingSettings.NODE_SEPARATION + 2,
   NODE_REACH_DIST = 24
}

export const enum PathfindingSettingsConst {
   /** Units of separation between the nodes horizontally and vertically */
   NODE_SEPARATION = 16,
   // @Robustness @Cleanup: Once merged with the laptop with SettingsConst, change from 16386 to SettingsConst.BOARD_UNITS
   NODES_IN_WORLD_WIDTH = 16384 / PathfindingSettings.NODE_SEPARATION + 2,
   NODE_REACH_DIST = 24
}