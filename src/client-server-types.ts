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
   readonly secondsSinceLastHit: number | null 
   readonly special?: ServerEntitySpecialData;
}

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
   readonly serverItemDataArray: ReadonlyArray<ServerItemEntityData>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   // Array of the IDs of all item entities the player picked up
   readonly pickedUpItems: ReadonlyArray<number>;
   /** How many ticks have passed in the server */
   readonly serverTicks: number;
   /** Any hits the player took on the server-side */
   readonly hitsTaken: ReadonlyArray<HitData>;
}

export type ServerItemData = {
   /** Unique identifier for the item */
   readonly id: number;
   readonly type: ItemType;
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

export type AttackPacket = {
   /** The id's of all entities in range of the attack */
   // Note: have to calculate the attacked entity in the server because the client doesn't have access to components
   readonly targetEntities: ReadonlyArray<number>;
   readonly heldItem: ItemInfo | null;
}

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   initial_game_data: (gameTicks: number, tiles: ReadonlyArray<ReadonlyArray<ServerTileData>>, playerID: number) => void;
   game_data_packet: (gameDataPacket: GameDataPacket) => void;
   chat_message: (senderName: string, message: string) => void;
   client_disconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   initial_game_data_request: () => void;
   initial_player_data_packet: (initialPlayerDataPacket: InitialPlayerDataPacket) => void;
   player_data_packet: (playerDataPacket: PlayerDataPacket) => void;
   chat_message: (message: string) => void;
   player_movement: (position: [number, number], movementHash: number) => void;
   attack_packet: (attackPacket: AttackPacket) => void;
}

export interface InterServerEvents {}