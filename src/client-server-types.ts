import { CraftingRecipe } from "./crafting-recipes";
import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { ItemType } from "./items";
import { StatusEffectType } from "./status-effects";
import { BiomeName, TileType } from "./tiles";
import { Point } from "./utils";

/*
- In general, the "Data" suffix on a type indicates that it is a common type between the client and server used to communicate with the two.
*/

/********************
   Items/Inventory
********************/

export interface ItemData {
   /** Unique identifier for the number */
   readonly id: number;
   readonly type: ItemType;
   readonly count: number;
}

export type ItemSlotData = ItemData | null;

export type InventoryData = { [itemSlot: number]: ItemData };

export interface PlayerInventoryData {
   readonly hotbar: InventoryData;
   readonly backpackSlot: ItemSlotData;
   readonly backpackInventory: InventoryData;
   /** Item currently being held by the player */
   readonly heldItemSlot: ItemSlotData;
   /** Item held in the player's crafting output slot */
   readonly craftingOutputItemSlot: ItemSlotData;
}

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

interface BaseHitboxData<T extends HitboxType> {
   readonly type: T;
   readonly offset?: [number, number];
}

export interface CircularHitboxData extends BaseHitboxData<"circular"> {
   readonly type: "circular";
   readonly radius: number;
}

export interface RectangularHitboxData extends BaseHitboxData<"rectangular"> {
   readonly type: "rectangular";
   readonly width: number;
   readonly height: number;
}

interface HitboxDataTypesRecord {
   circular: () => CircularHitboxData,
   rectangular: () => RectangularHitboxData
}

export type HitboxData<T extends HitboxType> = ReturnType<HitboxDataTypesRecord[T]>;

export interface BaseHitboxInfo<T extends HitboxType> {
   readonly type: T;
   readonly offset?: Point;
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

interface HitboxInfoTypesRecord {
   circular: () => CircularHitboxInfo,
   rectangular: () => RectangularHitboxInfo
}

export type HitboxInfo<T extends HitboxType> = ReturnType<HitboxInfoTypesRecord[T]>;

export interface GameObjectData {
   readonly id: number;
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly terminalVelocity: number;
   readonly rotation: number;
   readonly chunkCoordinates: ReadonlyArray<[number, number]>; // Array of chunk coordinates
   readonly hitboxes: ReadonlyArray<HitboxData<HitboxType>>;
}

export interface EntityData<T extends EntityType> extends GameObjectData {
   readonly type: T;
   readonly clientArgs: Parameters<EntityInfoClientArgs[T]>;
   readonly secondsSinceLastHit: number | null;
   readonly statusEffects: Array<StatusEffectType>;
   readonly special?: ServerEntitySpecialData;
}

export interface DroppedItemData extends GameObjectData {
   readonly type: ItemType;
}

export type ProjectileType = "ice_shards";

export interface ProjectileData extends GameObjectData {
   readonly type: ProjectileType;
}

export interface HitData {
   readonly knockback: number;
   readonly knockbackDirection: number;
}

/** Data about the game state sent to the client each tick */
export type GameDataPacket = {
   readonly entityDataArray: ReadonlyArray<EntityData<EntityType>>;
   readonly droppedItemDataArray: ReadonlyArray<DroppedItemData>;
   readonly projectileDataArray: ReadonlyArray<ProjectileData>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   readonly inventory: PlayerInventoryData;
   /** How many ticks have passed in the server */
   readonly serverTicks: number;
   /** Current time of the server */
   readonly serverTime: number;
   /** Any hits the player took on the server-side */
   readonly hitsTaken: ReadonlyArray<HitData>;
   readonly playerHealth: number;
   readonly statusEffects: Array<StatusEffectType>;
}

/** Initial data sent to the client */
export interface InitialGameDataPacket extends GameDataPacket {
   readonly playerID: number;
   readonly tiles: Array<Array<ServerTileData>>;
   readonly spawnPosition: [number, number];
}

export type VisibleChunkBounds = [minChunkX: number, maxChunkX: number, minChunkY: number, maxChunkY: number];

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

export type PlayerInventoryType = "hotbar" | "backpackInventory" | "craftingOutput" | "backpackItemSlot";
export type PlaceablePlayerInventoryType = Extract<PlayerInventoryType, "hotbar" | "backpackItemSlot" | "backpackInventory">;

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
   initial_player_data: (username: string) => void;
   initial_game_data_request: () => void;
   deactivate: () => void;
   activate: () => void;
   player_data_packet: (playerDataPacket: PlayerDataPacket) => void;
   chat_message: (message: string) => void;
   player_movement: (position: [number, number], movementHash: number) => void;
   crafting_packet: (craftingRecipe: CraftingRecipe) => void;
   item_pickup_packet: (inventoryType: PlayerInventoryType, itemSlot: number, amount: number) => void;
   // Tells the server that the client wants to release the held item at the specified place in an inventory
   item_release_packet: (inventoryType: PlaceablePlayerInventoryType, itemSlot: number, amount: number) => void;
   attack_packet: (attackPacket: AttackPacket) => void;
   item_use_packet: (itemSlot: number) => void;
   throw_held_item_packet: (throwDirection: number) => void;
   // Tells the server to respawn the client
   respawn: () => void;
   command: (command: string) => void;
}

export interface InterServerEvents {}