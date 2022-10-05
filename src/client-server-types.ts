import { BiomeName } from "./biomes";
import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { ItemID, ItemInfo } from "./items";
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
}

export type ServerItemData = {
   readonly id: number;
   readonly itemID: ItemID;
   readonly count: number;
   readonly position: [number, number];
   readonly chunkCoordinates: ReadonlyArray<[number, number]>;
   readonly rotation: number;
}

export type ServerAttackData = {
   readonly targetEntityID: number;
   /** How far through being hit the target entity is */
   readonly progress: number;
}

export type GameDataPacket = {
   readonly serverEntityDataArray: ReadonlyArray<ServerEntityData>;
   readonly serverItemDataArray: ReadonlyArray<ServerItemData>;
   readonly tileUpdates: ReadonlyArray<ServerTileUpdateData>;
   readonly serverAttackDataArray: ReadonlyArray<ServerAttackData>;
}

export type InitialPlayerDataPacket = {
   readonly username: string;
   readonly position: [number, number];
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
   initialGameData: (gameTicks: number, tiles: ReadonlyArray<ReadonlyArray<ServerTileData>>, playerID: number) => void;
   gameDataPacket: (gameDataPacket: GameDataPacket) => void;
   chatMessage: (senderName: string, message: string) => void;
   clientDisconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   initialPlayerDataPacket: (initialPlayerDataPacket: InitialPlayerDataPacket) => void;
   playerDataPacket: (playerDataPacket: PlayerDataPacket) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
   attackPacket: (attackPacket: AttackPacket) => void;
}

export interface InterServerEvents {}