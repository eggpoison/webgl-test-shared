import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { ItemInfo } from "./items/items";
import { Tile } from "./Tile";

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export type EntityData<T extends EntityType> = {
   readonly id: number;
   /** The type of entity (e.g. "cow") */
   readonly type: T;
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly rotation: number;
   readonly terminalVelocity: number;
   readonly clientArgs: Parameters<EntityInfoClientArgs[T]>;
   readonly chunks: ReadonlyArray<[number, number]>; // Array of chunk coordinates
}

export type GameDataPacket = {
   readonly nearbyEntities: ReadonlyArray<EntityData<EntityType>>;
}

export type PlayerDataPacket = {
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector | null
   readonly acceleration: [number, number] | null; // Vector | null
   readonly rotation: number;
   readonly terminalVelocity: number;
}

export type AttackPacket = {
   readonly targetID: number;
   readonly distance: number;
   readonly angle: number;
   readonly heldItem: ItemInfo | null;
}

export interface ServerAttackPacket extends AttackPacket {
   readonly senderID: number;
}

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   initialGameData: (gameTicks: number, tiles: Array<Array<Tile>>, playerID: number) => void;
   gameDataPacket: (gameDataPacket: GameDataPacket) => void;
   attackPacket: (serverAttackPacket: ServerAttackPacket) => void;
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