import { CraftingRecipe } from "./crafting-recipes";
import { EntityInfoClientArgs, EntityType } from "./entities";
import { ItemType } from "./items";
import { ParticleData } from "./particles";
import { StatusEffectType } from "./status-effects";
import { BiomeName, TileType } from "./tiles";
import { TribeType } from "./tribes";
import { Point } from "./utils";

export interface ItemData {
   /** Unique identifier for the number */
   readonly id: number;
   readonly type: ItemType;
   readonly count: number;
}

export type ItemSlotData = ItemData | null;

export type ItemSlotsData = { [itemSlot: number]: ItemData };

export interface InventoryData {
   readonly itemSlots: ItemSlotsData;
   readonly width: number;
   readonly height: number;
   readonly entityID: number;
   readonly inventoryName: string;
}

export interface PlayerInventoryData {
   readonly hotbar: InventoryData;
   readonly backpackSlot: InventoryData;
   readonly backpackInventory: InventoryData;
   /** Item currently being held by the player */
   readonly heldItemSlot: InventoryData;
   /** Item held in the player's crafting output slot */
   readonly craftingOutputItemSlot: InventoryData;
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
   readonly hitDirection: number | null;
}

export interface TribeData {
   readonly tribeType: TribeType;
   readonly numHuts: number;
   readonly tribesmanCap: number;
}

/** Data about the game state sent to the client each tick */
export type GameDataPacket = {
   readonly entityDataArray: ReadonlyArray<EntityData<EntityType>>;
   readonly droppedItemDataArray: ReadonlyArray<DroppedItemData>;
   readonly projectileDataArray: ReadonlyArray<ProjectileData>;
   readonly particles: ReadonlyArray<ParticleData>;
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
   /** Extra debug information about a game object being tracked */
   readonly gameObjectDebugData?: GameObjectDebugData;
   readonly tribeData: TribeData | null;
}

/** Initial data sent to the client */
export interface InitialGameDataPacket extends GameDataPacket {
   readonly playerID: number;
   readonly tiles: Array<Array<ServerTileData>>;
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
export interface AttackPacket {
   /** The item slot of the item which is being used to attack */
   readonly itemSlot: number;
   /** The direction that the attack is being done */
   readonly attackDirection: number;
   /** The id's of all entities in range of the attack */
   readonly targetEntities: ReadonlyArray<number>;
}

export interface RespawnDataPacket {
   readonly playerID: number;
   readonly spawnPosition: [number, number];
}

export interface DebugData {
   readonly colour: [r: number, g: number, b: number];
}

export interface LineDebugData extends DebugData {
   readonly targetPosition: [number, number];
   readonly thickness: number;
}

export interface CircleDebugData extends DebugData {
   readonly radius: number;
   readonly thickness: number;
}

export interface TileHighlightData extends DebugData {
   readonly tilePosition: [tileX: number, tileY: number];
}

export interface GameObjectDebugData {
   /** ID of the game object being tracked */
   readonly gameObjectID: number;
   readonly lines: Array<LineDebugData>;
   readonly circles: Array<CircleDebugData>;
   readonly tileHighlights: Array<TileHighlightData>;
   readonly health?: number;
   readonly maxHealth?: number;
}

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   spawn_position: (spawnPosition: [number, number]) => void;
   initial_game_data_packet: (gameDataPacket: InitialGameDataPacket) => void;
   game_data_packet: (gameDataPacket: GameDataPacket) => void;
   game_data_sync_packet: (gameDataSyncPacket: GameDataSyncPacket) => void;
   chat_message: (senderName: string, message: string) => void;
   client_disconnect: (clientID: string) => void;
   respawn_data_packet: (respawnDataPacket: RespawnDataPacket) => void;
   force_position_update: (position: [number, number]) => void;
}

export interface ClientToServerEvents {
   spawn_position_request: () => void;
   initial_player_data: (username: string, visibleChunkBounds: VisibleChunkBounds) => void;
   initial_game_data_request: () => void;
   deactivate: () => void;
   activate: () => void;
   player_data_packet: (playerDataPacket: PlayerDataPacket) => void;
   chat_message: (message: string) => void;
   player_movement: (position: [number, number], movementHash: number) => void;
   crafting_packet: (craftingRecipe: CraftingRecipe) => void;
   item_pickup_packet: (entityID: number, inventoryName: string, itemSlot: number, amount: number) => void;
   // Tells the server that the client wants to release the held item at the specified place in an inventory
   item_release_packet: (entityID: number, inventoryName: string, itemSlot: number, amount: number) => void;
   attack_packet: (attackPacket: AttackPacket) => void;
   item_use_packet: (itemSlot: number) => void;
   throw_held_item_packet: (throwDirection: number) => void;
   // Tells the server to respawn the client
   respawn: () => void;
   command: (command: string) => void;
   // Tells the server to start sending debug information about a certain game object
   track_game_object: (gameObjectID: number | null) => void;
}

export interface InterServerEvents {}