import { CraftingRecipe } from "./crafting-recipes";
import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { ItemType } from "./items";
import { BiomeName, TileType } from "./tiles";

/*
- In general, the "Data" suffix on a type indicates that it is a common type between the client and server used to communicate with the two.
*/

/********************
   Items/Inventory
********************/

export interface ItemData {
   readonly type: ItemType;
   readonly count: number;
}

export type ItemSlotData = ItemData | null;

export type InventoryData = { [itemSlot: number]: ItemData };

export interface PlayerInventoryData {
   readonly hotbar: InventoryData;
   readonly backpackItemSlot: ItemSlotData;
   /** Item currently being held by the player */
   readonly heldItemSlot: ItemSlotData;
   /** Item held in the player's crafting output slot */
   readonly craftingOutputItemSlot: ItemSlotData;
}

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export type ServerTileData = {
   readonly x: number;
   readonly y: number;
   readonly type: TileType;
   readonly biomeName: BiomeName;
   readonly isWall: boolean;
}

export type ServerTileUpdateData = {
   readonly x: number;
   readonly y: number;
   readonly type: TileType;
   readonly isWall: boolean;
}

export type ServerEntitySpecialData = {
   readonly mobAIType: string;
}

export type HitboxType = "circular" | "rectangular";

interface BaseHitboxInfo<T extends HitboxType> {
   readonly type: T;
}

export interface CircularHitboxInfo extends BaseHitboxInfo<"circular"> {
   readonly type: "circular";
   readonly radius: number;
}

export interface RectangularHitboxInfo extends BaseHitboxInfo<"rectangular"> {
   readonly type: "rectangular";
   readonly width: number;
   readonly height: number;
}


interface HitboxTypesRecord {
   circular: () => CircularHitboxInfo,
   rectangular: () => RectangularHitboxInfo
}

export type HitboxInfo<T extends HitboxType> = ReturnType<HitboxTypesRecord[T]>;

export type ServerEntityData = {
   readonly id: number;
   readonly type: EntityType;
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly terminalVelocity: number;
   readonly rotation: number;
   readonly clientArgs: Parameters<EntityInfoClientArgs[EntityType]>;
   readonly chunkCoordinates: ReadonlyArray<[number, number]>; // Array of chunk coordinates
   readonly secondsSinceLastHit: number | null;
   readonly hitboxes: ReadonlyArray<HitboxInfo<HitboxType>>;
   readonly special?: ServerEntitySpecialData;
}

export type ServerItemEntityData = {
   readonly id: number;
   readonly itemID: ItemType;
   readonly count: number;
   readonly position: [number, number];
   readonly velocity: [number, number] | null;
   readonly chunkCoordinates: ReadonlyArray<[number, number]>;
   readonly rotation: number;
}

export type HitData = {
   readonly knockback: number;
   readonly angleFromDamageSource: number;
}

/** Data about the game state sent to the client each tick */
export type GameDataPacket = {
   readonly serverEntityDataArray: ReadonlyArray<ServerEntityData>;
   readonly serverItemEntityDataArray: ReadonlyArray<ServerItemEntityData>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   readonly inventory: PlayerInventoryData;
   /** How many ticks have passed in the server */
   readonly serverTicks: number;
   /** Any hits the player took on the server-side */
   readonly hitsTaken: ReadonlyArray<HitData>;
   readonly playerHealth: number;
}

/** Initial data sent to the client */
export interface InitialGameDataPacket extends GameDataPacket {
   readonly playerID: number;
   readonly tiles: Array<Array<ServerTileData>>;
   readonly spawnPosition: [number, number];
}

/** Data the player sends to the server each tick */
export type PlayerDataPacket = {
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly rotation: number;
   readonly terminalVelocity: number;
   readonly visibleChunkBounds: VisibleChunkBounds;
}

/** 
 * Data the server has about the player and game state.
 * Used when syncing a player with the server when they tab back into the game.
 *  */
export interface GameDataSyncPacket {
   readonly position: [number, number];
   readonly velocity: [number, number] | null;
   readonly acceleration: [number, number] | null;
   readonly rotation: number;
   readonly terminalVelocity: number;
   readonly health: number;
   readonly inventory: PlayerInventoryData;
}

/** Data sent to the server when an attack is performed */
export type AttackPacket = {
   /** The item slot of the item which is being used to attack */
   readonly itemSlot: number;
   /** The direction that the attack is being done */
   readonly attackDirection: number;
   /** The id's of all entities in range of the attack */
   readonly targetEntities: ReadonlyArray<number>;
}

export type PlayerInventoryType = "hotbar" | "craftingOutput" | "backpackItemSlot";
export type PlaceablePlayerInventoryType = Extract<PlayerInventoryType, "hotbar" | "backpackItemSlot">;

export type RespawnDataPacket = {
   readonly playerID: number;
   readonly spawnPosition: [number, number];
}

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   initial_game_data_packet: (gameDataPacket: InitialGameDataPacket) => void;
   game_data_packet: (gameDataPacket: GameDataPacket) => void;
   game_data_sync_packet: (gameDataSyncPacket: GameDataSyncPacket) => void;
   chat_message: (senderName: string, message: string) => void;
   client_disconnect: (clientID: string) => void;
   respawn_data_packet: (respawnDataPacket: RespawnDataPacket) => void;
}

export interface ClientToServerEvents {
   initial_player_data: (username: string, windowWidth: number, windowHeight: number) => void;
   initial_game_data_request: () => void;
   deactivate: () => void;
   activate: () => void;
   player_data_packet: (playerDataPacket: PlayerDataPacket) => void;
   chat_message: (message: string) => void;
   player_movement: (position: [number, number], movementHash: number) => void;
   crafting_packet: (craftingRecipe: CraftingRecipe) => void;
   item_hold_packet: (inventoryType: PlayerInventoryType, itemSlot: number) => void;
   // Tells the server that the client wants to release the held item at the specified place in an inventory
   item_release_packet: (inventoryType: PlaceablePlayerInventoryType, itemSlot: number) => void;
   attack_packet: (attackPacket: AttackPacket) => void;
   item_use_packet: (itemSlot: number) => void;
   throw_held_item_packet: (throwDirection: number) => void;
   // Tells the server to respawn the client
   respawn: () => void;
}

export interface InterServerEvents {}