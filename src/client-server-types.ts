import { BiomeName } from "./biomes";
import { CraftingRecipe } from "./crafting-recipes";
import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { ItemType, ItemInfo } from "./items";
import { TileType } from "./tiles";

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export type ServerTileData = {
   readonly x: number;
   readonly y: number;
   readonly type: TileType;
   readonly biome: BiomeName;
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

export type ServerItemData = {
   readonly type: ItemType;
   readonly count: number;
}

export type ServerInventoryData = Partial<Record<number, ServerItemData>>;

export type ServerItemEntityData = {
   readonly id: number;
   readonly itemID: ItemType;
   readonly count: number;
   readonly position: [number, number];
   readonly chunkCoordinates: ReadonlyArray<[number, number]>;
   readonly rotation: number;
}

export type HitData = {
   readonly damage: number;
   readonly angleFromDamageSource: number | null;
}

export type GameDataPacket = {
   readonly serverEntityDataArray: ReadonlyArray<ServerEntityData>;
   readonly serverItemEntityDataArray: ReadonlyArray<ServerItemEntityData>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   /** The hotbar of the player from the perspective of the server */
   readonly hotbarInventory: ServerInventoryData;
   /** The item stored in the player's crafting output slot */
   readonly craftingOutputItem: ServerItemData | null;
   /** The item being held by the player */
   readonly heldItem: ServerItemData | null;
   /** How many ticks have passed in the server */
   readonly serverTicks: number;
   /** Any hits the player took on the server-side */
   readonly hitsTaken: ReadonlyArray<HitData>;
}

export interface InitialGameDataPacket extends GameDataPacket {
   readonly playerID: number;
   readonly tiles: Array<Array<ServerTileData>>;
   readonly spawnPosition: [number, number];
}

export type InitialPlayerDataPacket = {
   readonly username: string;
   readonly position: [number, number];
   readonly visibleChunkBounds: VisibleChunkBounds;
}

export type PlayerDataPacket = {
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly rotation: number;
   readonly terminalVelocity: number;
   readonly visibleChunkBounds: VisibleChunkBounds;
}

/** 
 * Data the server has about the player
 * Used when syncing a player with the server when they tab back into the game
 *  */
export type ServerPlayerDataPacket = {
   readonly position: [number, number];
   readonly velocity: [number, number] | null;
   readonly acceleration: [number, number] | null;
   readonly rotation: number;
   readonly terminalVelocity: number;
   readonly health: number;
}

export type AttackPacket = {
   /** The item slot of the item which is being used to attack */
   readonly itemSlot: number;
   /** The id's of all entities in range of the attack */
   readonly targetEntities: ReadonlyArray<number>;
}

export type PlayerInventoryType = "hotbar" | "craftingOutput";
export type PlaceablePlayerInventoryType = Extract<PlayerInventoryType, "hotbar">;

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   initial_game_data_packet: (gameDataPacket: InitialGameDataPacket) => void;
   game_data_packet: (gameDataPacket: GameDataPacket) => void;
   chat_message: (senderName: string, message: string) => void;
   client_disconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   initial_player_data: (username: string, windowWidth: number, windowHeight: number) => void;
   initial_game_data_request: () => void;
   player_data_packet: (playerDataPacket: PlayerDataPacket) => void;
   chat_message: (message: string) => void;
   player_movement: (position: [number, number], movementHash: number) => void;
   crafting_packet: (craftingRecipe: CraftingRecipe) => void;
   item_hold_packet: (inventoryType: PlayerInventoryType, itemSlot: number) => void;
   // Tells the server that the client wants to release the held item at the specified place in an inventory
   item_release_packet: (inventoryType: PlaceablePlayerInventoryType, itemSlot: number) => void;
   attack_packet: (attackPacket: AttackPacket) => void;
   item_use_packet: (itemSlot: number) => void;
}

export interface InterServerEvents {}