import { EntityType } from "./entity-info";
import { Tile } from "./Tile";

export type VisibleChunkBounds = [minX: number, maxX: number, minY: number, maxY: number];

export type BaseEntityData = {
   readonly id: number;
   readonly position: [number, number];
   readonly velocity: [number, number];
   readonly acceleration: [number, number];
   readonly terminalVelocity: [number, number];
}

export interface NewEntityData extends BaseEntityData {
   /** The type of entity (e.g. "cow") */
   readonly type: EntityType;
}

export interface UpdatedEntityData extends BaseEntityData {}

export interface SocketData {}

export interface ServerToClientEvents {
   chatMessage: (senderName: string, message: string) => void;
   clientDisconnect: (clientID: string) => void;
   initialGameData: (gameTicks: number, tiles: Array<Array<Tile>>) => void;
}

export interface ClientToServerEvents {
   initialPlayerData: (name: string, position: [number, number], visibleChunkBounds: VisibleChunkBounds) => void;
   chatMessage: (message: string) => void;
   playerMovement: (position: [number, number], movementHash: number) => void;
   newVisibleChunkBounds: (visibleChunkBounds: VisibleChunkBounds) => void;
}

export interface InterServerEvents {}