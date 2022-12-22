import { BiomeName } from "./biomes";
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
   /** The inventory of the player from the perspective of the server */
   readonly playerInventory: ServerInventoryData;
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
 * Useful when syncing a player with the server when they tab back into the game
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
   /** The id's of all entities in range of the attack */
   // Note: have to calculate the attacked entity in the server because the client doesn't have access to components
   readonly targetEntities: ReadonlyArray<number>;
   readonly heldItem: ItemInfo | null;
}

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
   attack_packet: (attackPacket: AttackPacket) => void;
}

export interface InterServerEvents {}