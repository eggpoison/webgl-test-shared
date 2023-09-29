import { EntityInfoClientArgs, EntityType, TribeMemberAction } from "./entities";
import { ItemType } from "./items";
import { ProjectileType } from "./projectiles";
import { StatusEffectType } from "./status-effects";
import { BiomeName, TileType } from "./tiles";
import { TribeType } from "./tribes";

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
   readonly armourSlot: InventoryData;
}

export interface ServerTileData {
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

export interface BaseHitboxData {
   readonly offsetX?: number;
   readonly offsetY?: number;
}

export interface CircularHitboxData extends BaseHitboxData {
   readonly radius: number;
}

export interface RectangularHitboxData extends BaseHitboxData {
   readonly width: number;
   readonly height: number;
}

export interface GameObjectData {
   readonly id: number;
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly rotation: number;
   readonly mass: number;
   readonly hitboxes: ReadonlyArray<RectangularHitboxData | CircularHitboxData>;
   readonly ageTicks: number;
}

export interface StatusEffectData {
   readonly type: StatusEffectType;
   readonly ticksElapsed: number;
}

export const HitFlags = {
   HIT_BY_FLESH_SWORD: 1 << 0
}

export interface HitData {
   readonly knockback: number;
   readonly angleFromAttacker: number | null;
   readonly flags: number;
}

export interface EntityData<T extends EntityType> extends GameObjectData {
   readonly type: T;
   readonly clientArgs: Parameters<EntityInfoClientArgs[T]>;
   readonly statusEffects: Array<StatusEffectData>;
   /** Any hits the entity took server-side */
   readonly hitsTaken: ReadonlyArray<HitData>;
   readonly amountHealed: number;
   readonly mobAIType?: string;
}

export interface DroppedItemData extends GameObjectData {
   readonly type: ItemType;
}

export interface ProjectileData extends GameObjectData {
   readonly type: ProjectileType;
}

export interface TribeData {
   readonly id: number;
   readonly tribeType: TribeType;
   readonly numHuts: number;
   readonly tribesmanCap: number;
   readonly area: ReadonlyArray<[tileX: number, tileY: number]>;
}

/** Data about the game state sent to the client each tick */
export interface GameDataPacket {
   readonly entityDataArray: ReadonlyArray<EntityData<EntityType>>;
   readonly droppedItemDataArray: ReadonlyArray<DroppedItemData>;
   readonly projectileDataArray: ReadonlyArray<ProjectileData>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   readonly inventory: PlayerInventoryData;
   /** How many ticks have passed in the server */
   readonly serverTicks: number;
   /** Current time of the server */
   readonly serverTime: number;
   readonly playerHealth: number;
   /** Extra debug information about a game object being tracked */
   readonly gameObjectDebugData?: GameObjectDebugData;
   readonly tribeData: TribeData | null;
   readonly killedEntityIDs: ReadonlyArray<number>;
   readonly hasFrostShield: boolean;
}

export enum WaterRockSize {
   small,
   large
}

export interface WaterRockData {
   readonly position: [number, number];
   readonly rotation: number;
   readonly size: WaterRockSize;
   readonly opacity: number;
}

export enum RiverSteppingStoneSize {
   small,
   medium,
   large
}

export const RIVER_STEPPING_STONE_SIZES: Record<RiverSteppingStoneSize, number> = {
   [RiverSteppingStoneSize.small]: 32,
   [RiverSteppingStoneSize.medium]: 48,
   [RiverSteppingStoneSize.large]: 56
};

export interface RiverSteppingStoneData {
   readonly position: [number, number];
   readonly rotation: number;
   readonly size: RiverSteppingStoneSize;
}

/** Initial data sent to the client */
export interface InitialGameDataPacket extends GameDataPacket {
   readonly playerID: number;
   readonly tiles: Array<Array<ServerTileData>>;
   readonly waterRocks: ReadonlyArray<WaterRockData>;
   readonly riverSteppingStones: ReadonlyArray<RiverSteppingStoneData>;
   readonly riverFlowDirections: Record<number, Record<number, number>>;
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
   readonly selectedItemSlot: number;
   readonly action: TribeMemberAction;
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
   crafting_packet: (recipeIndex: number) => void;
   item_pickup: (entityID: number, inventoryName: string, itemSlot: number, amount: number) => void;
   // Tells the server that the client wants to release the held item at the specified place in an inventory
   item_release: (entityID: number, inventoryName: string, itemSlot: number, amount: number) => void;
   // Effectively the item_pickup and item_release events combined
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