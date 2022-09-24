import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { ItemInfo } from "./items/items";
import { Tile, TileType } from "./Tile";

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export type TileUpdate = {
   readonly x: number;
   readonly y: number;
   readonly type: TileType;
   readonly isWall: boolean;
}

export type EntityData<T extends EntityType> = {
   readonly id: number;
   /** The type of entity (e.g. "cow") */
   readonly type: T;
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly deceleration: number;
   readonly terminalVelocity: number;
   readonly rotation: number;
   readonly clientArgs: Parameters<EntityInfoClientArgs[T]>;
   readonly chunks: ReadonlyArray<[number, number]>; // Array of chunk coordinates
}

export type ServerAttackInfo = {
   readonly targetEntityID: number;
   /** How far through being hit the target entity is */
   readonly progress: number;
}

export type GameDataPacket = {
   readonly nearbyEntities: ReadonlyArray<EntityData<EntityType>>;
   readonly tileUpdates: ReadonlyArray<TileUpdate>;
   readonly serverAttackInfoArray: ReadonlyArray<ServerAttackInfo>;
}

export type PlayerDataPacket = {
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly rotation: number;
   readonly terminalVelocity: number;
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
   initialGameData: (gameTicks: number, tiles: ReadonlyArray<ReadonlyArray<Tile>>, playerID: number) => void;
   gameDataPacket: (gameDataPacket: GameDataPacket) => void;
   chatMessage: (senderName: string, message: string) => void;
   clientDisconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   initialPlayerData: (name: string, position: [number, number], visibleChunkBounds: VisibleChunkBounds) => void;
   playerDataPacket: (playerDataPacket: PlayerDataPacket) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
   newVisibleChunkBounds: (visibleChunkBounds: VisibleChunkBounds) => void;
   attackPacket: (attackPacket: AttackPacket) => void;
}

export interface InterServerEvents {}