import { EntityInfoClientArgs, EntityType } from "./entity-info";
import { Tile } from "./Tile";

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export type EntityData<T extends EntityType> = {
   readonly id: number;
   /** The type of entity (e.g. "cow") */
   readonly type: T;
   readonly position: [number, number]; // Point
   readonly velocity: [number, number] | null; // Vector
   readonly acceleration: [number, number] | null; // Vector
   readonly terminalVelocity: number;
   readonly clientArgs: Parameters<EntityInfoClientArgs[T]>;
}

export type GameDataPacket = {
   readonly nearbyEntities: ReadonlyArray<EntityData<EntityType>>;
}

export type PlayerMovementPacket = {

}

// Note to stupid future self: don't remove this, it's important
export interface SocketData {}

export interface ServerToClientEvents {
   initialGameData: (gameTicks: number, tiles: Array<Array<Tile>>) => void;
   gameDataPacket: (gameDataPacket: GameDataPacket) => void;
   chatMessage: (senderName: string, message: string) => void;
   clientDisconnect: (clientID: string) => void;
}

export interface ClientToServerEvents {
   initialPlayerData: (name: string, position: [number, number], visibleChunkBounds: VisibleChunkBounds) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
   newVisibleChunkBounds: (visibleChunkBounds: VisibleChunkBounds) => void;
}

export interface InterServerEvents {}